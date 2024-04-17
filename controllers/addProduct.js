const db = require("../models");
const products = db.products;

module.exports = {
  addProduct: async (req, res) => {
    const { product_name, product_price, programId, merchantId, created_by } =
      req.body;
    try {
      const newProduct = await products.create({
        product_name,   
        product_price,
        programId,
        merchantId,
        created_by,
      });

      if (newProduct) {
        res.status(200).json({
          message: "Product added successfully",
          season: newProduct,
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
