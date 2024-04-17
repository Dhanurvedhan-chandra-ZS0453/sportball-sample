const env = require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const router = require("./router/index");


const app = express();
const PORT = config.SERVER_PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);


// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL,
//     pass: process.env.WORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
//  });
// transporter.verify((err, success) => {
//   err
//     ? console.log(err)
//     : console.log(`=== Server is ready to take messages: ${success} ===`);
//  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});