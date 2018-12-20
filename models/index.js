import mongoose, { Schema } from "mongoose";
// import "dotenv/config"; for environment variable upload
mongoose.Promise = require("bluebird");

// mongoose
//   .connect(
//     `mongodb://${process.env.username}:${
//       process.env.password
//     }@ds155293.mlab.com:55293/userdata`,
//     { useNewUrlParser: true },
//   )
//   .then(() => console.log("Connected to db"))
//   .catch(err => console.log(err));
mongoose
  .connect(
    `mongodb://localhost:27017/survaiderdb`,
    { useNewUrlParser: true },
  )
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

const peopleschema = Schema({
  age: Number,
  workclass: String,
  fnlwgt: Number,
  education: String,
  "education-num": Number,
  "marital-status": String,
  occupation: String,
  relationship: String,
  race: String,
  sex: String,
  "capital-gain": Number,
  "capital-loss": Number,
  "hours-per-week": Number,
  "native-country": String,
  "prediction-level": String,
});

module.exports = mongoose.model("survaiders", peopleschema);
