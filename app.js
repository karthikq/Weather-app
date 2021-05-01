/** @format */

const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios");
const app = express();
const ejs = require("ejs");

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  const query = req.body.location;

  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&units=metric&appid=8d70aa6a2f1bd2697408a29ee8db6cc9",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      let weatherdData = {
        temperature: data.data.main.temp,
        desciption: data.data.weather[0].description,
        humidity: data.data.main.humidity,
        windSpeed: data.data.wind.speed,
        icon: data.data.weather[0].icon,
        lon: data.data.coord.lon,
        lat: data.data.coord.lat,
      };

      const link =
        "https://openweathermap.org/img/wn/" + weatherdData.icon + "@2x.png";

      res.render("home", {
        data: weatherdData,
        link,
        query,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, function () {
  console.log("server is running");
});
