const express = require("express");
const Auction = require("../models/campsite");
const auctionRouter = express.Router();

auctionRouter
  .route("/buy/auctions")
  .get((req, res, next) => {
    Auction.find()
      .then((auctions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(auctions);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Auction.create(req.body)
      .then((auction) => {
        console.log("Auction Created ", auction);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(auction);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /buy/auctions");
  })
  .delete((req, res, next) => {
    Auction.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

auctionRouter
  .route("/buy/auctions/:auctionId")
  .get((req, res, next) => {
    Auction.findById(req.params.auctionId)
      .then((auction) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(auction);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /buy/auctions/${req.params.auctionId}`
    );
  })
  .put((req, res, next) => {
    Auction.findByIdAndUpdate(
      req.params.auctionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((auction) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(auction);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Auction.findByIdAndDelete(req.params.auctionId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = auctionRouter;
