const router = require('express').Router();
const Product = require('../models/Products');
const {verifyTokenAndAdmin} = require('./verifyToken');

//CREATE PRODUCT

router.post('/add', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET ALL PRODUCTS

router.get('/', async (req, res) => {
  const qOffset = +req.query.offset;
  const qCategory = req.query.category;

  try {
    let products;
    if (qCategory) {
      products = await Product.find({category: qCategory});
    } else if (qOffset) {
      products = await Product.find().sort({createdAt: -1}).limit(qOffset);
    } else {
      products = await Product.find().sort({createdAt: -1});
    }

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET PRODUCT BY ID

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOne({id: req.params.id});
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
});

//UPDATE

router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.params.id);
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {id: req.params.id},
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
});

//DELETE

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedUser = await Product.findOneAndDelete({id: req.params.id});
    res.status(200).json('Product has been deleted');
  } catch (e) {
    res.status(500).json(e);
  }
});


module.exports = router;
