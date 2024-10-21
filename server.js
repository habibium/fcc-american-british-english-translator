require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expect = require("chai").expect;
const cors = require("cors");

const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");
const userRoutes = require("./routes/api.js");

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));
app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

// User routes
userRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

const portNum = process.env.PORT || 3000;

// Start our server and tests!
const listen = (port) =>
  new Promise((resolve, reject) => {
    const listener = app
      .listen(port, () => resolve(listener))
      .on("error", (e) => {
        if (e.code === "EADDRINUSE") {
          console.log(`Port ${port} is busy, trying ${port + 1}...`);
          resolve(listen(port + 1));
        }
        reject(e);
      });
  });

listen(+process.env.PORT || 3000)
  .then((listener) => {
    console.log("Your app is listening on port " + listener.address().port);
    if (process.env.NODE_ENV === "test") {
      console.log("Running Tests...");
      setTimeout(function () {
        try {
          runner.run();
        } catch (e) {
          console.log("Tests are not valid:");
          console.error(e);
        }
      }, 1500);
    }
  })
  .catch(console.error);

module.exports = app; // For testing
