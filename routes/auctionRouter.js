const express = require("express");
const auctionRouter = express.Router();

auctionRouter
  .route("/buy/auctions")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Send all auctions");
  })
  .post((req, res) => {
    res.end(
      `Will add auction: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update auction: ${req.body.name}`);
  })
  .delete((req, res) => {
    res.end("Delete all auctions");
  });

auctionRouter
  .route("/buy/auctions/:auctionId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send single auction");
  })
  .post((req, res) => {
    res.end(
      `Will add the auction: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update single auction: ${req.body.name}`);
  })
  .delete((req, res) => {
    res.end(`Will delete auction: ${req.params.auctionName}`);
  });

module.exports = auctionRouter;
