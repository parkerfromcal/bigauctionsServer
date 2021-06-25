const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      requird: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
