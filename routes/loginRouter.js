const express = require("express");
const Login = require("../models/login");

const loginRouter = express.Router();

loginRouter
  .route("/login")
  .get((req, res) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /login");
  })
  .post((req, res, next) => {
    loginRouter
      .create(req.body)
      .then((login) => {
        console.log("Login Created", login);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(login);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /login");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /login");
  });

loginRouter
  .route("/login/:userId")
  .get((req, res, next) => {
    Login.findById(req.params.userId)
      .then((login) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(login);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /login/${req.params.userId}`);
  })
  .put((req, res, next) => {
    Login.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((login) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(login);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Login.findByIdAndDelete(req.params.userId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = loginRouter;
