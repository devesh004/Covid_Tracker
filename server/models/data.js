const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  ID: String,
  Country: String,
  CountryCode: String,
  Province: String,
  City: String,
  CityCode: String,
  Lat: String,
  Lon: String,
  Confirmed: Number,
  Deaths: Number,
  Recovered: Number,
  Active: Number,
  Date: String,
});

module.exports = mongoose.model("Data", DataSchema);
