const db = require("../models");
const merchants = db.merchants;

module.exports = {
  addMerchants: async (req, res) => {
    const { merchant_name, created_by } =
      req.body;
    try {
      const newMerchant = await merchants.create({
        merchant_name,
        created_by,
      });

      if (newMerchant) {
        res.status(200).json({
          message: "Merchant added successfully",
          season: newMerchant,
        });
      } else {
        res.status(404).json({
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  },
};
