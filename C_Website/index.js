const express = require("express");
const { join } = require("path");
const session = require("express-session");
const api = express();

//apiInitializationStart
api.use("/", express.static(join(__dirname, "..", "html")));
api.use(session({ secret: "GroBot", resave: true, saveUninitialized: false }));
//apiInitializationEnd

function redirectToHome(req, res, next) {
  const allowedPaths = ["/", "/dashboard", "/mobile"];
  const requestedPath = req.path;
  if (!allowedPaths.includes(requestedPath)) {
    res.sendFile(join(__dirname, "..", "html", "others", "error.html"));
  } else {
    next();
  }
}

//RouterStart
const router = express.Router();
router.use(redirectToHome);
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