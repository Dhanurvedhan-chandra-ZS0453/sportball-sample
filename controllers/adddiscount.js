const db = require("../models");
const discounts = db.discounts;

module.exports = {
  addDiscount: async (req, res) => {
    const { discount_code, discount_amount, created_by } =
      req.body;
    try {
      const discount = await discounts.create({
        discount_code,
        discount_amount,
        created_by,
      });

      if (discount) {
        res.status(200).json({
          message: "discount added successfully",
          season: discount,
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
