const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  currentUser: {
    type: String,
    required: false,
  },
  artid: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  descriptionn: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

// Create the Artwork model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
