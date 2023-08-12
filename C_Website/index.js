const express = require("express");
const { join } = require("path");
const session = require("express-session");
const api = express();

//apiInitializationStart
api.use("/", express.static(join(__dirname, "..", "html")));
api.use(session({ secret: "GroBot", resave: true, saveUninitialized: false }));
//apiInitializationEnd

//RouterStart
const router = express.Router();
router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "index.html"));
});
router.get("/dashboard", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "dashboard.html"));
});
router.get("/mobile", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "mobile.html"));
});
api.use(router);
//RouterEnd

module.exports = api;