const db = require("../models");
const payments = db.payments;


module.exports = {
    payments: async (req, res) => {
      const payment = await payments.findAll();
  
      if (payment) {
        res.status(200).json({
          message: "Fetched payments",
          category: payment,
        });
      } else {
        res.status(404).json({
          message: "payment not Found",
        });
      }
    },
  };
  