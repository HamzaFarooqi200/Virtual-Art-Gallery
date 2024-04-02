const express=require('express')
const { logInUser , signUpUser , forgetPassword} = require("../controller/userController")
const multer  = require('multer')


const router=express.Router()

router.post('/login', logInUser)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, "C:/Users/Dell/Desktop/FYP/FYP/frontend/src/uploads/ProfileImage/")
      cb(null, "C:/Users/jamsh/Desktop/FYP/FYP/frontend/src/uploads/ProfileImage/")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/signup',upload.single('image'), signUpUser)

router.post('/forgetPassword', forgetPassword)

module.exports=router