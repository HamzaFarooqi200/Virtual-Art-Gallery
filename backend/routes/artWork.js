// Import necessary modules
const express = require('express');
const router = express.Router();
const multer  = require('multer')

const { saveArtwork, getAllArtworks } = require('../controller/artController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   //Kabeers Path
    //cb(null, "C:/Users/Lenovo/OneDrive/Desktop/Final/FYP/frontend/src/uploads/")
    //jamshaid path
    cb(null, "C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/temporaryRepo/")
    // waqas path
    //cb(null, "C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/ProfileImage/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Route for saving artwork with file upload
router.post('/upload', upload.single('image'),  saveArtwork);

//Route for getting all the artworks
router.get('/allArtworks', getAllArtworks);

module.exports = router;
