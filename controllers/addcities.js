const db = require("../models");
const cities = db.cities;

module.exports = {
  addCities: async (req, res) => {
    const { city_name, stateId, created_by } =
      req.body;
    try {
      const newCity = await cities.create({
        city_name,
        stateId,
        created_by,
      });

      if (newCity) {
        res.status(200).json({
          message: "city added successfully",
          season: newCity,
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
