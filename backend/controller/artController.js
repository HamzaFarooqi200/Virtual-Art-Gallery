const Artwork = require('../models/artWork');
const Cookies = require('js-cookie');
const Jimp = require('jimp');
const fs = require('fs-extra');

// Function to calculate cosine similarity between two images
async function calculateCosineSimilarity(image1Path, image2Path) {
  try {
      // Load images using Jimp
      const image1 = await Jimp.read(image1Path);
      const image2 = await Jimp.read(image2Path);

      // Convert images to grayscale
      image1.grayscale();
      image2.grayscale();

      // Get pixel data of both images
      const pixels1 = image1.bitmap.data;
      const pixels2 = image2.bitmap.data;

      // Calculate dot product and magnitudes
      let dotProduct = 0;
      let magnitude1 = 0;
      let magnitude2 = 0;
      for (let i = 0; i < pixels1.length; i += 4) {
          const pixel1 = pixels1[i] / 255; // Normalize pixel values to range [0, 1]
          const pixel2 = pixels2[i] / 255;
          dotProduct += pixel1 * pixel2;
          magnitude1 += pixel1 * pixel1;
          magnitude2 += pixel2 * pixel2;
      }

      // Calculate cosine similarity
      const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
      return similarity;
  } catch (error) {
      throw new Error('Error processing images: ' + error.message);
  }
}

const saveArtwork = async (req, res) => {
  try {
    // Extract data from the request
    const { title, price, medium, style, category, ownership, description, uploadedBy } = req.body;
    const image = req.file.filename;
    const dummyImagePath = req.file.path;

    //console.log("dummy image path : ",req.file.path);

    // Path to store original image
    const imagePathToCheck = `C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/orignalimages/`;

    const files = await fs.readdir(imagePathToCheck);
    for (const file of files) {
      console.log("file : ",file);
        const similarity = await calculateCosineSimilarity(dummyImagePath, `C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/orignalimages/${file}`);
        console.log("similarity : ",similarity)
        if (similarity >= 0.98) {
            // If similarity is above threshold, it's a duplicate
            return res.status(400).json({ error: 'Duplicate image found' });
        }
    }
    const originalImagePath = `C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/orignalimages/${req.file.filename}`
    // Copy the uploaded image to the directory without watermark
    await fs.copy(req.file.path, originalImagePath);

    
    // Load the image using jimp
    const loadedImage = await Jimp.read(req.file.path);

    // Load the watermark image using jimp
    const watermark = await Jimp.read("C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/watermark/watermarkimage.jpg");

    // Reduce the size of the watermark
    watermark.resize(100, Jimp.AUTO); // Adjust the size as needed

    // Calculate the position for the watermark (top right corner)
    const x = loadedImage.bitmap.width - watermark.bitmap.width - 10; // 10 pixels margin from the right
    const y = 10; // 10 pixels margin from the top

    // Composite the watermark onto the loaded image
    loadedImage.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5 // Adjust the opacity of the watermark as needed
    });

    // Path to store the modified image
    const uploadedImagePath = `C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/uploadedimages/${req.file.filename}`;
    // Save the modified image
    await loadedImage.writeAsync(uploadedImagePath);

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
   
    await fs.remove(dummyImagePath);

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
  saveArtwork,
  getAllArtworks
};


