// jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");



app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const appKey = "7d73f9d2f4bfb61ccca6c5bb0216b03b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const weatherDescription = weatherData.weather[0].description;

            res.write("<h1>The weather in " + query + " is " + weatherDescription + "</h1> <br>");
            res.write("The temperature is: " + temp + " degrees celsuis <br>");
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    });


})


app.listen(3000, () => {
    console.log("server running at port 3000...");
});