const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const nodemailer = require("nodemailer");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().getDate(),
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpires: {
    type: Date,
    required: false,
  },
});

userSchema.statics.signUp = async (firstName, lastName, email, password, dateOfBirth, gender, image) => {
  if (!email || !password) {
    throw Error("Email and password must not be empty");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }

  const UserModel = mongoose.model("User");

  const alreadyExsist = await UserModel.findOne({ email });
  if (alreadyExsist) {
    throw Error("Email already exists");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ralph.aufderhar@ethereal.email',
        pass: 'p61pubm9Rfju3Er91R'
      }
    });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    const info = await transporter.sendMail({
      from: '"VAG 👻" <VAG@gmail.com>',
      to: email,
      subject: "OTP Verification",
      text: otp,
      html: `<b>VAG ltd.</b><br><br>Your OTP is: ${otp}`,
    });

    if (info.messageId) {
      const saltValue = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, saltValue);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hash,
        dateOfBirth,
        gender,
        image,
        otp,
        otpExpires,
      });

      return user;
    } else {
      throw new Error("Email not sent");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}

userSchema.statics.verifyOtp = async (email, otp) => {
  const UserModel = mongoose.model("User");
  console.log(email, otp)

  const user = await UserModel.findOne({ email, otp });

  if (!user) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpires < Date.now()) {
    throw new Error("OTP expired");
  }

  // OTP verified, clear OTP fields
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return user;
}

userSchema.statics.logIn = async (email, password) => {
  if (!email || !password) {
    throw Error("Email and password must not be empty");
  }

  const UserModel = mongoose.model("User");

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
}

userSchema.statics.sendOtpForPasswordReset = async function (email) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

  // Sending email
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ralph.aufderhar@ethereal.email',
        pass: 'p61pubm9Rfju3Er91R'
      }
    });

    const info = await transporter.sendMail({
      from: '"VAG 👻" <VAG@gmail.com>',
      to: email,
      subject: "OTP Verification for Password Reset",
      text: otp,
      html: `<b>VAG ltd.</b><br><br>Your OTP is: ${otp}`,
    });

    if (info.messageId) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      throw new Error("Email not sent");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }

  return { message: "OTP sent to your email" };
};

userSchema.statics.resetPassword = async function (email, otp, newPassword) {
  const user = await this.findOne({ email, otp });

  if (!user) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpires < Date.now()) {
    throw new Error("OTP expired");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { message: "Password reset successfully" };
};

const User = mongoose.model("User", userSchema);

module.exports = User;