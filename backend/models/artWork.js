const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdYear: {
    type: Number,
    default: new Date().getFullYear() // Set default to the current year
  },
  price: {
    type: Number,
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Photography', 'Painting', 'Calligraphy', 'Sketching', 'Others'],
    required: true
  },
  ownership: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
});

// Create the Artwork model
const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
