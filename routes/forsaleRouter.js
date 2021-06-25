const express = require("express");
const ForSale = require("../models/forsale");
const forsaleRouter = express.Router();

forsaleRouter
  .route("/buy/for-sale")
  .get((req, res, next) => {
    ForSale.find()
      .then((forsale) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(forsale);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    ForSale.create(req.body)
      .then((forsale) => {
        console.log("For Sale Created ", forsale);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(forsale);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /buy/for-sale");
  })
  .delete((req, res, next) => {
    ForSale.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

forsaleRouter
  .route("/buy/for-sale/:forsaleId")
  .get((req, res, next) => {
    ForSale.findById(req.params.auctionId)
      .then((forsale) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(forsale);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /buy/for-sale/${req.params.forsaleId}`
    );
  })
  .put((req, res, next) => {
    ForSale.findByIdAndUpdate(
      req.params.forsaleId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((forsale) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(forsale);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    ForSale.findByIdAndDelete(req.params.forsaleId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = forsaleRouter;
