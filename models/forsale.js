const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const forsaleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
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

module.exports = mongoose.model("ForSale", forsaleSchema);
