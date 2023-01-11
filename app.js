const { json } = require("express");
const express = require("express");
const https = require("https");
const bodParser = require("body-parser");
const { userInfo } = require("os");
const app = express();
app.use(bodParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const city = req.body.cityName;
  const apikey = "63f42f7eda908ad6c0fa9697a8c8a985";
  const unit = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherdiscription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<b>The Weather is currently " + weatherdiscription + "</b>");
      res.write("<h1>The Temperature in " + city + " is "+temp + " Degrees Fahrenheit</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("Server is running on Port 3000.");
});
