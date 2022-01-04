const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    src: {type: String, required: true},
    category: {type: String},
    size: {type: String},
    optionSizes: {type: Array},
    optionColors: {type: Array},
    price: {type: Number},
    id: {type: Number}
  },
  {timestamps: true}
);

module.exports = mongoose.model('product', ProductSchema);
