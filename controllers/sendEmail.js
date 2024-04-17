const util = require('../util/util');
const logger = require('../util/logger'); // Importing the logger module

module.exports = {
    sendBulkEmail: async (req, res) => {
        // Assuming req.body contains an array of recipients and a common URL for all emails
        const { recipients, url } = req.body;

        // Ensure recipients and URL are provided
        if (!Array.isArray(recipients) || recipients.length === 0 || !url) {
            return res.status(400).json({ error: "Both 'recipients' (as an array) and 'url' are required." });
        }

        // Constructing mail options with dynamic values
        const mailOptionsList = recipients.map(to => ({
            from: "dhanurvedhan082@gmail.com",
            to: to,
            subject: "Nodemailer API",
            text: `Hi from your nodemailer API. You can access the application here: ${url}`,
        }));

        // Sending bulk emails
        try {
            const transporter = await util.mailFunction();
            const promises = mailOptionsList.map((mailOptions, index) => new Promise((resolve, reject) => {
                setTimeout(() => {
                    transporter.sendMail(mailOptions, function (err, data) {
                        if (err) {
                            // Log the error
                            logger.logError(err, `Error sending email to ${mailOptions.to}`);
                            reject(err);
                        } else {
                            console.log("Email sent successfully to " + mailOptions.to);
                            resolve();
                        }
                    });
                }, index * 500); // Delay each email by 5 seconds
            }));

            await Promise.all(promises);
            res.json({ status: "Bulk emails sent successfully." });
        } catch (error) {
            logger.logError(error, `Error sending Bulk Email`);
            res.status(500).json("Failed to send bulk emails." );
        }
    }
    
}