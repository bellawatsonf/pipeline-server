// require("dotenv").config();
if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
// const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware/erorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
