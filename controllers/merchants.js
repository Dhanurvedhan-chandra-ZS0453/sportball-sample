const db = require("../models");
const merchants = db.merchants;


module.exports = {
    merchants: async (req, res) => {
      const merchant = await merchants.findAll();
  
      if (merchant) {
        res.status(200).json({
          message: "Fetched merchants",
          category: merchant,
        });
      } else {
        res.status(404).json({
          message: "merchant not Found",
        });
      }
    },
  };
  