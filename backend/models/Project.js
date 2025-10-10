// Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title:    { type: String, required: true },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] }, // un tag par techno
  url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

