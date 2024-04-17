const db = require("../models");
const discounts = db.discounts;


module.exports = {
    discounts: async (req, res) => {
      const discount = await discounts.findAll();
  
      if (discount) {
        res.status(200).json({
          message: "Fetched discounts",
          category: discount,
        });
      } else {
        res.status(404).json({
          message: "discount not Found",
        });
      }
    },
  };
  