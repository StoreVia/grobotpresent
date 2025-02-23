const express = require("express");
const { join } = require("path");
const session = require("express-session");
const api = express();

//apiInitializationStart
api.use("/", express.static(join(__dirname, "..", "html")));
api.use(session({ secret: "GroBot", resave: true, saveUninitialized: false }));
//apiInitializationEnd

//redirectFunctionStart
function redirect(req, res, next){
  const allowedPaths = ["/", "/dashboard", "/mobile", "/privacypolicy", "/termsofservice"];
  const requestedPath = req.path;
  if(!allowedPaths.includes(requestedPath)){
    res.sendFile(join(__dirname, "..", "html", "others", "error.html"));
  } else {
    next();
  }
}
//redirectFunctionEnd

//routStart
const rout = express.Router();
rout.use(redirect);
rout.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "index.html"));
});
rout.get("/dashboard", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "dashboard.html"));
});
rout.get("/mobile", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "mobile.html"));
});
rout.get("/privacypolicy", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "privacypolicy.html"));
});
rout.get("/termsofservice", (req, res) => {
  res.sendFile(join(__dirname, "..", "html", "others", "termsofservice.html"));
});
api.use(rout);
//routEnd

module.exports = api;