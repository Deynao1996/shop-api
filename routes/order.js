const router = require('express').Router();
const Order = require('../models/Order');

//POSTORDER

router.post('/send', async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOreder = await newOrder.save();
    res.status(200).json(savedOreder);
  } catch (e) {
    res.status(500).json(e)
  }
});


module.exports = router;
