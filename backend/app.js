require("dotenv").config(); // Charge les variables d'environnement dès le début

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("node:path");
const mongoose = require("mongoose");
const multer = require("multer");

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DBNAME || "test",
  })
  .then(() => console.log("✅ Connexion à MongoDB réussie !"))
  .catch((err) =>
    console.error("❌ Connexion à MongoDB échouée :", err.message)
  );

const app = express();

// 0) Confiance proxy (Render/Cloudflare) -> IP correcte pour le rate-limit
app.set("trust proxy", 1);

// 1) Helmet (CSP) — filtre les valeurs falsy pour éviter 'undefined'
const IMG_ALLOW = [
  "'self'",
  "data:",
  process.env.CLIENT_URL,
  "blob:",
  "https://res.cloudinary.com",
].filter(Boolean);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: IMG_ALLOW,
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
      scriptSrcAttr: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use((req, res, next) => {
  if (req.headers.origin) console.log("[Origin]", req.headers.origin);
  next();
});

// 2) CORS — filtre pour éviter undefined
const WHITELIST = [
  process.env.CLIENT_URL, // ex: https://portfolio-stephane.vercel.app
  "http://localhost:5174", // Vite
].filter(Boolean);

function isAllowed(origin) {
  try {
    const u = new URL(origin); // ex: https://my-branch-123.vercel.app
    const host = u.host; // my-branch-123.vercel.app
    const proto = u.protocol; // https:
    // Autorise : exacts, sous-domaines vercel.app, localhost
    const ok =
      WHITELIST.includes(origin) ||
      host.endsWith(".vercel.app") ||
      host === "localhost:5174";
    // On n’autorise http que pour localhost
    return ok && (proto === "https:" || host.startsWith("localhost"));
  } catch {
    return false;
  }
}

const corsOptions = {
  origin(origin, cb) {
    // Autorise Postman/SSR (pas d’en-tête Origin)
    if (!origin) return cb(null, true);
    const ok = isAllowed(origin);
    if (!ok) {
      console.error("[CORS] Blocked origin:", origin); // ← log utile
      return cb(new Error("Not allowed by CORS"));
    }
    return cb(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // mets à false si tu n’utilises pas de cookies cross-site
  optionsSuccessStatus: 204,
};

// Important : place CORS très tôt, avant rate-limit/sanitize/routes
app.use(cors(corsOptions));

// 3) Sanitize / XSS
//app.use(mongoSanitize());
//app.use(xss());

// 4) Static images (avant le limiter si tu ne veux pas les compter)
const IMAGES_DIR = process.env.IMAGES_DIR || path.join(__dirname, "images");
app.use("/images", express.static(IMAGES_DIR));

// 5) Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6) Rate-limit — seulement pour /api, en-têtes standard + Retry-After
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: { error: "Trop de requêtes, réessayez plus tard." },
  skip: (req) => req.method === "OPTIONS",
  handler: (req, res /* , next, options */) => {
    const reset = res.getHeader("RateLimit-Reset");
    if (reset) res.setHeader("Retry-After", reset);
    return res.status(429).json({
      error: "Trop de requêtes, réessayez plus tard.",
      limit: res.getHeader("RateLimit-Limit"),
      remaining: res.getHeader("RateLimit-Remaining"),
      reset: res.getHeader("RateLimit-Reset"),
    });
  },
});
app.use("/api", apiLimiter);

// 7) Routes
const skillRoutes = require("./Routes/Skills.routes");
const softSkillRoutes = require("./Routes/softSkills.routes");
const projectRoutes = require("./Routes/projects.routes");
const contactRoutes = require("./Routes/contact.routes");
const cdnRoutes = require("./Routes/cdn.routes");

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/softskills", softSkillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cdn", cdnRoutes);

// 8) 404
app.use((req, res) => {
  res.status(404).json({ error: "Ressource introuvable" });
});

// 9) Un SEUL handler d’erreurs global (fusion Multer/Mongoose)

app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ where: "multer", code: err.code, message: err.message });
  }
  if (err?.name === "ValidationError") {
    return res
      .status(400)
      .json({ where: "mongoose", message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({
      where: "unknown",
      message: err?.message || "Erreur interne du serveur",
    });
});

module.exports = app;
