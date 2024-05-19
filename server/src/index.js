const express = require("express");
require("dotenv").config();
const connectToDB = require("./helpers/connectToDB");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 5050;

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// logger middleware
app.use((req, _, next) => {
  console.log(`Request ${req.method} at ${req.url}`);
  next();
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
