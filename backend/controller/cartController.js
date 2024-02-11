const Cart = require("../models/cart");


const saveCart = async (req, res) => {
  try {
    // Extract data from the request
    console.log(req.body);
    const { currentUser, artid, price, description, image } = req.body;

    // Check if the image already exists in the database
    const existingCart = await Cart.findOne({ image });

    if (existingCart) {
      // If the image already exists, return an error response
      return res.status(400).json({ error: "Image already exists in the cart" });
    }

    // Create an instance of Cart model
    const newCart = new Cart({
      currentUser,
      artid,
      price,
      description,
      image,
    });

    // Save the cart entry to the database
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
    //console.log("my arts : ", { cartItems });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAllCartItems = async (req, res) => {
  try {
    // Delete all items from the cart
    await Cart.deleteMany({});

    res.status(200).json({ message: 'All cart items deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const deleteCartItem = async (req, res) => {
//   try {
//     const { cartItemId } = req.params;

//     // Find and delete the cart item by ID
//     const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

//     if (!deletedCartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     res.status(200).json({ message: 'Cart item deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {
  saveCart,
  getAllCartItems,deleteAllCartItems
};
