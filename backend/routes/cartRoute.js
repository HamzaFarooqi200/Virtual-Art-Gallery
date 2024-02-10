// Import necessary modules
const express = require("express");
const router = express.Router();

const { saveCart, getAllCartItems } = require("../controller/cartController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       "C:/Users/Hamza Farooqi/Desktop/jam/FYP/frontend/src/uploads/Cart"
//     );
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// Route for saving artwork with file upload
router.post("/uploadCart", saveCart);

//Route for getting all the artworks
router.get("/allCarts", getAllCartItems);

module.exports = router;
