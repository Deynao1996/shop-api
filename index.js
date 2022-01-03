const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DBConnection Successfull'))
    .catch((e) => console.log(e));

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
