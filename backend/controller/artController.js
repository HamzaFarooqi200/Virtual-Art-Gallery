const Artwork = require('../models/artWork');  
const Cookies = require('js-cookie');
const Jimp = require('jimp');
const fs = require('fs-extra');

const saveArtwork = async (req, res) => {
  try {
    // // Extract data from the request
    // console.log(req.body);
    const { title, price, medium, style, category, ownership, description, uploadedBy } = req.body;
    const image = req.file.filename;

    // Path to store original image
    const originalImagePath = `C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/orignalimages/${req.file.filename}`;

    // Copy the uploaded image to the directory without watermark
    await fs.copy(req.file.path, originalImagePath);

    // Load the image using jimp
    const loadedImage = await Jimp.read(req.file.path);

    // Load the watermark image using jimp
    const watermark = await Jimp.read("C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/watermark/VAG.png"); 

    // Calculate the position for the watermark (for example, bottom right corner)
    const x = loadedImage.bitmap.width - watermark.bitmap.width - 10; // 10 pixels margin from the right
    const y = loadedImage.bitmap.height - watermark.bitmap.height - 10; // 10 pixels margin from the bottom

    // Composite the watermark onto the loaded image
    loadedImage.composite(watermark, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5 // Adjust the opacity of the watermark as needed
    });

    // Save the modified image
    await loadedImage.writeAsync(req.file.path);

    // Create an instance of Artwork model
    const newArtwork = new Artwork({
      title,
      price,
      medium,
      style,
      category,
      ownership,
      description,
      image: image,
      uploadedBy: uploadedBy
    });

    // Save the artwork to the database
    await newArtwork.save();

    res.status(201).json({ message: 'Artwork uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllArtworks = async (req, res) => {
  try {
    // Fetch all the artworks from the database
    const artworks = await Artwork.find({});
    //console.log("my arts : ",{artworks});

    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  saveArtwork,getAllArtworks
};

