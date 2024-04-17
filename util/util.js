const nodemailer = require('nodemailer');
const { ClientSecretCredential } = require("@azure/identity");


const mailFunction = async () =>{
    // console.log(process.env.EMAIL);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
 });
 return transporter;
};


const outlookmail = async () =>{
        const credentials = new ClientSecretCredential(
          process.env.AZURE_TENANT_ID,
          process.env.AZURE_CLIENT_ID,
          process.env.AZURE_CLIENT_SECRET,
          { tenantId: process.env.AZURE_TENANT_ID, username: process.env.OUTLOOKEMAIL }
        );
    
        const tokenCredential = await credentials.getToken("https://outlook.office365.com/.default");
         console.log(tokenCredential);
    
        const outlooktransporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            type: "OAuth2",
            user: process.env.OUTLOOKEMAIL,
            accessToken: tokenCredential.token,
            clientId: process.env.AZURE_CLIENT_ID,
            clientSecret: process.env.AZURE_CLIENT_SECRET,
          },
        });    
    
        return outlooktransporter;
        };

module.exports = {
    mailFunction,
    outlookmail
}