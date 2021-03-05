const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        body: "Use this site to get your weather!",
        name: "Akshat Raj Vansh",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        forecast(
            latitude,
            longitude,
            (error, { weather, temperature, feelslike } = {}) => {
                if (error) return res.send({ error });
                res.send({
                    Location: location,
                    Weather: weather,
                    Temperature: temperature,
                    FeelsLike: feelslike,
                });
            }
        );
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        body: "This site was created by Akshat Raj Vansh. It uses data from mapbox.com and weatherstack.com!",
        name: "Akshat Raj Vansh",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        body: "This page will provide you with all the help you'll ever need.",
        name: "Akshat Raj Vansh",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        error: "Help article not found!",
        name: "Akshat Raj Vansh",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        error: "Page not found!",
        name: "Akshat Raj Vansh",
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port + ".");
});