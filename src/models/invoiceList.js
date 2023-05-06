const mongoose = require("mongoose");
const invoices = mongoose.Schema(
  {
    billNo: {
      unique: true,
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Invoices = mongoose.model("invoices", invoices);

module.exports = Invoices;
