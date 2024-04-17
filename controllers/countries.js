const db = require("../models");
const countries = db.countries;


module.exports = {
    countries: async (req, res) => {
      const country = await countries.findAll();
  
      if (country) {
        res.status(200).json({
          message: "Fetched countries",
          category: country,
        });
      } else {
        res.status(404).json({
          message: "country not Found",
        });
      }
    },
  };
  