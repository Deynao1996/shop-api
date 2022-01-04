const router = require('express').Router();
const Product = require('../models/Products');

//CREATE PRODUCT

// router.post('/post', async (req, res) => {
//   const newProduct = new Product({
//     title: req.body.title,
//     description: req.body.description,
//     src: req.body.src,
//     category: req.body.category,
//     size: req.body.size,
//     optionSizes: req.body.optionSizes,
//     optionColors: req.body.optionColors,
//     price: req.body.price,
//     id: req.body.id
//   });
//
//   try {
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

//GET ALL PRODUCTS

router.get('/getProducts', async (req, res) => {
  const offset = +req.query.offset;

  try {
    let products;

    if (offset) {
      products = await Product.find().sort({createdAt: -1}).limit(offset);
    } else {
      products = await Product.find().sort({createdAt: -1});
    }

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET PRODUCT BY ID

router.get('/getProducts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOne({id: req.params.id});
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
});


module.exports = router;
