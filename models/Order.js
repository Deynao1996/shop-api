const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    address_city: {type: String, required: true},
    address_country: {type: String, required: true},
    address_line1: {type: String, required: true},
    orderProducts: {type: String, required: true}
  },
  {timestamps: true}
);

module.exports = mongoose.model('orders', OrderSchema);
