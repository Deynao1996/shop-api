const router = require('express').Router();
const stripe = require('stripe')('sk_test_51KAXsmEFNiWrQ3Fh9EWQKWQMHkCrb2CTZhkLKJmo2V4qPYy71raA1kFZAEh73Blc4aQlBqnzxqst07nQ4DocKQju00FuFviGlI');


router.post('/checkout', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.id,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
