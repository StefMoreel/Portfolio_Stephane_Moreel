// Project.js
const mongoose = require('mongoose');

const ImgProjectSchema = new mongoose.Schema({
  publicId: { type: String, required: true, trim: true },
  alt:      { type: String, default: "", trim: true },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  image: { type: ImgProjectSchema, required: true },
  title:    { type: String, required: true },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] }, // un tag par techno
  url: { type: String, required: true }
}, { timestamps: true, collection: 'Projects', versionKey: false});

module.exports = mongoose.model('Project', ProjectSchema);

