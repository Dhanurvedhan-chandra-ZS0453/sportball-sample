const env = require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const router = require("./router/index");

const app = express();
const PORT = config.SERVER_PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});