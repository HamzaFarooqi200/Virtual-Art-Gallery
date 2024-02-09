// fixing env which basically handel the environment variables for us
require("dotenv").config();

// importing mongoose
const mongoose = require("mongoose");

const express = require("express");

// for local db connection
//const {connectToDb, getDb} = require('./connectDb')

require("../backend/models/userSchema");
require("../backend/models/artWork");

//const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");
const artworkRoutes = require("./routes/artWork");

//making an instance of express
const app = express();

// middleware
app.use(express.json()); // This middleware parses JSON in the request body
app.use((req, res, next) => {
  console.log(req.body);res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//app.use("/api/workouts/", workoutRoutes);

// using  users routes
app.use("/api/users/", userRoutes);

app.use("/api/artworks/", artworkRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB cluster");
    app.listen(process.env.PORT, () => {
      console.log("Server started at port ", process.env.PORT);
    });
  })
  .catch((err) => console.log("HERE", err));
