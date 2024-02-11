// Import necessary modules
const express = require("express");
const router = express.Router();

const { getUserData, getUserArts } = require('../controller/userProfileController');


//Route for getting the relevent user data
router.get("/getUserProfileData", getUserData);

//Route for getting the artwork uploaded by user
router.get("/getUserArtWorks", getUserArts);


module.exports = router;
