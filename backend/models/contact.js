// Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  message:   { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
