const router = require('express').Router();
const Product = require('../models/Products');

//GET ALL PRODUCTS

router.get('/get', async (req, res) => {
  let products = await Product.find();

  res.status(200).json(products);
});


module.exports = router;
