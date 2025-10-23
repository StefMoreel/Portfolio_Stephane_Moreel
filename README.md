# Portfolio – Stéphane Moreel

Un portfolio full-stack pour présenter mon profil, mes compétences (techniques & soft skills) et mes projets.
Front en **React + Vite + Tailwind v4**, back en **Node.js + Express**, données dans **MongoDB Atlas**, médias servis via **imgbb**.

## ✨ Fonctionnalités

* **Accueil / Hero** (photo optimisée, liens sociaux, CV téléchargeable)
* **Compétences techniques** (skills) – logos dynamiques, texte
* **Soft skills** – cartes avec flip mobile + affichage desktop
* **Projets** – cartes avec image, tags techno, lien externe, panneau repliable “détails” animé
* **Contact** – formulaire accessible, enregistrement en base + envoi mail (via SMTP)
* **Responsive** (mobile → desktop), **accessibilité** (labels, aria-*), **perf** (LCP, assets optimisés)

---

## 🧱 Stack

**Front**

* React 19, Vite
* Tailwind CSS v4 (@theme & @utility)
* React Icons

**Back**

* Node.js, Express
* Mongoose (MongoDB Atlas)
* imgbb (upload API) pour les images
* Helmet (CSP), CORS, Rate-Limit

**Déploiement**

* **Frontend** : Vercel
* **Backend** : Render (ou autre)
* **Base** : MongoDB Atlas

---

## 📂 Structure (simplifiée)

```
.
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── Routes/
│   │   ├── skills.routes.js
│   │   ├── softSkills.routes.js
│   │   └── projects.routes.js
│   ├── controllers/
│   │   ├── skills.controller.js
│   │   ├── softSkills.controller.js
│   │   └── projects.controller.js
│   ├── models/
│   │   ├── Skill.js
│   │   ├── SoftSkill.js
│   │   └── Project.js
│   ├── middlewares/
│   │   └── uploadImgbb.js
│   └── services/
│       └── imgbb.js
│
└── frontend/
    ├── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── Hero.jsx
    │   │   ├── SkillCard.jsx
    │   │   ├── SoftSkillCard.jsx
    │   │   ├── Projects.jsx
    │   │   └── ProjectCard.jsx
    │   └── utils/
    │       └── constants.js
    └── vite.config.js

## 🔌 API – Endpoints principaux

### Skills

* `GET /api/skills` → liste des skills
* `PUT /api/skills/:id` → maj d’un skill (titre, subtitle, description, logos)


### Soft Skills

* `GET /api/softskills` → liste
* `GET /api/softskills/:id`
* `POST /api/softskills` → créer un soft skill


### Projects

* `GET /api/projects` → liste
* `GET /api/projects/:id`
* `POST /api/projects`



> **Important :** pour les mises à jour JSON, envoie **`Content-Type: application/json`** (évite `form-data` si tu ne postes pas de fichier).
> Pour multipart, le champ fichier est **`image`**.

---

## 🖼️ Images

* Les images sont **hébergées sur imgbb**.
* Le backend peut accepter soit **des URLs directes** (déjà hébergées), soit un **upload multipart** (via `uploadImgbb`).
* Helmet/CSP autorise `https://i.ibb.co` (et `data:` / `blob:`) pour l’affichage des images.

---

## 🛡️ Sécurité & Middleware

* **Helmet** : CSP stricte (scripts/feuilles locales, images whiteliste, etc.)
* **CORS** : whitelist origin (`CLIENT_URL`, `localhost:5174`, `*.vercel.app` si besoin)
* **Rate-Limit** : limite les appels `/api`
* **Mongoose** : schémas validés (champs requis/trim)

---

## 🚀 Frontend – Points clés

* **Tailwind v4** avec `@theme` et `@utility` pour centraliser couleurs, polices et gradients
* **Animations** :

  * Panneaux repliables animés via `grid-template-rows` (plus fluide que `max-height`)
  * Flip des Soft Skills en version mobile (carte “recto/verso”)
* **Perf** :

  * LCP priorisé (`fetchpriority="high"` sur l’image héro)
  * Lazy-loading sur les images non critiques
  * Icônes importées de façon ciblée

---

## 🌐 Déploiement

* **Backend (Render)**
* **Frontend (Vercel)**

---

## ✅ Qualité

* **Accessibilité** : labels + `aria-*`, boutons non vides, focus visibles
* **SEO** : balises de base, titres hiérarchisés, performances
* **Lighthouse** : optimisations LCP/CLS, réduction JS non utilisé

---

## 👤 Auteur

**Stéphane Moreel**

* LinkedIn : [https://www.linkedin.com/in/stéphane-moreel-0a85a2119/](https://www.linkedin.com/in/stéphane-moreel-0a85a2119/)
* GitHub : [https://github.com/StefMoreel](https://github.com/StefMoreel)
* Email : [stef.ksp@gmail.com]
