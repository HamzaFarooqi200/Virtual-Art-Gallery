const User = require("../models/userSchema");
const ArtWork = require("../models/artWork");

const getUserData = async (req, res) => {
  try {
    const userEmail = req.query.email;
    //console.log(userEmail)

    if (!userEmail) {
      return res.status(400).json({ error: "Email parameter is missing" });
    }

    const user = await User.find({ email: userEmail });

    //console.log("--------------------------------")
    //console.log(user)
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //console.log("Current user is: ", { user });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserArts = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ error: "Email parameter is missing" });
    }

    const arts = await ArtWork.find({ uploadedBy: userEmail });
    
    if (!arts) {
      return res.status(404).json({ error: "User not found" });
    }

   // console.log("Current user Arts are as : ", { arts });
    res.status(200).json(arts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserData,
  getUserArts
};
