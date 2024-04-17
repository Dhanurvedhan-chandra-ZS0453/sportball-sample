const db = require("../models");
const countries = db.countries;

module.exports = {
  addCountries: async (req, res) => {
    const { country_name, created_by } =
      req.body;
    try {
      const newCountry = await countries.create({
        country_name,
        created_by,
      });

      if (newCountry) {
        res.status(200).json({
          message: "country added successfully",
          season: newCountry,
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
