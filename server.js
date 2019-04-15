var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

var logger = require("morgan");

var PORT = process.env.PORT || 3000;

var cheerio = require("cheerio");
var axios = require("axios");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public/"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//axios

app.get("/", function(req, res) {
    axios.get("https://www.pcgamer.com/news/").then(function(response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $(".listingResult").each(function(i, element) {
            var title = $(element).find(".article-name").text();
            var link = $(element).find("a").attr("href");

            results.push({
                title: title,
                link: link
            });
        });
        console.log(results);
        res.render("index");
    });
});


// Handlebars
app.engine(
    "handlebars",
    handlebars({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;