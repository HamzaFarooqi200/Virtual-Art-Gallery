const Cart = require("../models/cart");
const Cookies = require("js-cookie");

const saveCart = async (req, res) => {
  try {
    // Extract data from the request
    console.log(req.body);
    const { currentUser, artid, price, description, image } = req.body;
    //const image = req.file.filename;
    console.log(req.body);
    // Create an instance of Artwork model
    const newCart = new Cart({
      currentUser,
      artid,
      price,
      description,
      image: image,
    });

    // Save the artwork to the database
    await newCart.save();

    res.status(201).json({ message: "Cart uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCartItems = async (req, res) => {
  try {
    // Fetch all the artworks from the database
    const cartItems = await Cart.find({});
    console.log("my arts : ", { cartItems });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  saveCart,
  getAllCartItems,
};
