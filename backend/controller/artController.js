const Artwork = require('../models/artWork');  
const Cookies = require('js-cookie');

const saveArtwork = async (req, res) => {
  try {
    // Extract data from the request
    console.log(req.body);
    const { title, price, medium, style, category, ownership, description, uploadedBy } = req.body;
    const image = req.file.filename;
    console.log(image);
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
    console.log("my arts : ",{artworks});

    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
  saveArtwork,getAllArtworks
};

