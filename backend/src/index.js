const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
const absPath = require("app-module-path");
const path = require("path");

absPath.addPath(__dirname);
const router = require("Routes");
const { portalServe } = require("Middleware");

const server = (async () => {
  try {
    await mongoose.connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connected to database");
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../../portal/build/")));
    app.use(portalServe);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/api/1.0", router);
    app.listen(process.env.PORT || config.get("port"));
    console.log("Server is running...");
  } catch (err) {
    console.log("Server startup failed" + err.message);
  }
})();

module.exports = server;
