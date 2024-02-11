// Import necessary modules
const express = require("express");
const router = express.Router();

const { saveCart, getAllCartItems,  deleteAllCartItems } = require('../controller/cartController');


// Route for saving artwork with file upload
router.post("/uploadCart", saveCart);

//Route for getting all the artworks
router.get("/allCarts", getAllCartItems);

// Route to delete a cart item by ID
//router.delete('/deleteCartItem/:cartItemId', deleteCartItem);

// Route to delete all cart items
router.delete('/deleteAllCartItems', deleteAllCartItems);



module.exports = router;
