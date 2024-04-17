const db = require("../models");
const products = db.products;


module.exports = {
    products: async (req, res) => {
      const product = await products.findAll();
  
      if (product) {
        res.status(200).json({
          message: "Fetched products",
          category: product,
        });
      } else {
        res.status(404).json({
          message: "product not Found",
        });
      }
    },
  };
  