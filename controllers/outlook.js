// const nodemailer = require("nodemailer");
// const { ClientSecretCredential } = require("@azure/identity");

// module.exports = {
//     outlookmail: async (req, res) => {
//   try {
//     const credentials = new ClientSecretCredential(
//       process.env.AZURE_TENANT_ID,
//       process.env.AZURE_CLIENT_ID,
//       process.env.AZURE_CLIENT_SECRET,
//       { tenantId: process.env.AZURE_TENANT_ID, username: process.env.OUTLOOKEMAIL }
//     );

//     const tokenCredential = await credentials.getToken("https://outlook.office365.com/.default");
//     console.log(tokenCredential);

//     const transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//     //   port: 587,
//     //   secure: false,
//       auth: {
//         type: "OAuth2",
//         user: process.env.OUTLOOKEMAIL,
//         accessToken: tokenCredential.token,
//         clientId: process.env.AZURE_CLIENT_ID,
//         clientSecret: process.env.AZURE_CLIENT_SECRET,
//       },
//     });

   
//     // let transporter = nodemailer.createTransport({
//     //     service: "smtp.office365.com",
//     //     auth: {
//     //       type: "OAuth2",
//     //       user: process.env.EMAIL,
//     //       pass: process.env.OUTLOOKWORD,
//     //       clientId: process.env.AZURE_CLIENT_ID,
//     //       clientSecret: process.env.AZURE_CLIENT_SECRET,
//     //       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     //     },
//     //    });
//     // Send a test email
//     const testEmailOptions = {
//       from: process.env.EMAIL,
//       to: "dhanurvedhan.c@outlook.com", // sending to the same email as sender for testing purposes
//       subject: "Test Email",
//       text: "This is a test email sent from your Node.js application using nodemailer and Azure OAuth2 authentication.",
//     };

//     await transporter.sendMail(testEmailOptions);
//     console.log("Test email sent successfully.");

//     return transporter;
//   } catch (error) {
//     console.error("Error creating transporter:", error);
//     throw error;
//   }
//     }
// }
// // module.exports = createTransporter;



// const util = require('../util/util');

// const testEmailOptions = {
//     from: process.env.EMAIL,
//     to: "dhanurvedhan.c@outlook.com", // sending to the same email as sender for testing purposes
//     subject: "Test Email",
//     text: "This is a test email sent from your Node.js application using nodemailer and Azure OAuth2 authentication.",
//   };

// module.exports = {
//     outlookmail: async (req, res) => {
//           util.outlookmail().then(outlooktransporter => {
//             outlooktransporter.sendMail(testEmailOptions, function (err, data) {
//             if (err) {
//               console.log("Error " + err);
//             } else {
//               console.log("Email sent successfully");
//               res.json({ status: "Email sent to " + testEmailOptions.to });
//             }
//           });
//         });
//     }
// }