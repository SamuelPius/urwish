const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/urwishDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

const userRegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  socialLogin: {
    type: Boolean,
    default: false,
  },
});

const UserRegistration = mongoose.model(
  "user-registration",
  userRegistrationSchema
);

app.post("/user-registration", (req, res) => {
    const { name, email, password } = req.body;
  
    const userRegistration = new UserRegistration({
      name,
      email,
      password,
    });
  
    userRegistration
      .save()
      .then(() => {
        console.log("User registered successfully");
        res.json({ message: "User registered successfully" });
      })
      .catch((error) => {
        console.error("Failed to register user", error);
        res.status(500).json({ message: "Failed to register user" });
      });
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the User Registration Page");
  });

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
