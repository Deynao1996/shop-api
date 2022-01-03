const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: String},
    color: {type: String},
    price: {type: Number},
    id: {type: Number}
  },
  {timestamps: true}
);

module.exports = mongoose.model('product', ProductSchema);
