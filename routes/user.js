const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

//UPDATE hasNewSletter

router.put("/newsletter/:id", async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {hasNewSletter: true},
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER

router.put("/update/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

//DELETE

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET USER

router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const {password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const {latest, offset} = req.query;

  try {
    const users = latest && offset ?
      await User.find().sort({_id: -1}).limit(offset) :
      await User.find();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

//GET STATS

router.get("/getStats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {$match: {createdAt: {$gte: lastYear}}},
      {
        $project:{
          month: {$month: '$createdAt'}
        }
      },
      {
        $group: {
          _id: '$month',
          total: {$sum: 1}
        }
      }
    ]);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
