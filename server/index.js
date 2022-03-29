if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const { default: axios } = require("axios");
const Data = require("./models/data.js");
const path = require("path");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/api/:country", async (req, res) => {
  const country = req.params.country;
  console.log(country);
  let data = await Data.find({ Country: country }).sort("-Date");
  if (data.length === 0) {
    const countryData = await axios.get(
      `https://api.covid19api.com/country/${country}`
    );
    data = await Data.create(countryData.data);
  } else {
    data = data.reverse();
  }
  res.status(200).json(data);
});

app.use("/api/auth/", authRoutes);

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(3001, () => {
  console.log("Welcome");
});
