const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // Serve the index.html file
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var cn = req.body.cityname;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cn +
    "&appid=56b4a4919e0c80a6652c5f2c8140e97b&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      // Check if weather data is available
      if (weatherData.weather && weatherData.weather.length > 0) {
        const iconUrl =
          "http://openweathermap.org/img/wn/" +
          weatherData.weather[0].icon +
          "@2x.png";

        // Display weather information
        res.write("<h1>The weather in " + cn + " is currently " + weatherData.weather[0].description + ".</h1>");
        res.write("<h2>The temperature is " + weatherData.main.temp + " degree Celsius.</h2>");
        res.write("<img src=" + iconUrl + ">");

        // Add button to check another city
        res.write("<form action='/' method='get'>");
        res.write("<button type='submit'>Check another city</button>");
        res.write("</form>");
        res.send();
      } else {
        // Display error message if no weather data is available
        res.write("<h1>No weather data available for " + cn + ".</h1>");
        res.write("<form action='/' method='get'>");
        res.write("<button type='submit'>Check another city</button>");
        res.write("</form>");
        res.send();
      }
    });
  });
});

app.listen(3000, function () {
  console.log("Server started listening on port 3000");
});
