const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const ordersRouter = require("./routes/order");
const productRouter = require("./routes/product");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");
const path = require("path");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DBConnection Successfull'))
    .catch((e) => console.log(e));

app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payment', stripeRouter);

// app.use(express.static(path.join(__dirname, "/client")));
//
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
