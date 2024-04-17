const db = require("../models");
const states = db.states;

module.exports = {
  addStates: async (req, res) => {
    const { state_name, countryId, created_by } =
      req.body;
    try {
      const newState = await states.create({
        state_name,
        countryId,
        created_by,
      });

      if (newState) {
        res.status(200).json({
          message: "State added successfully",
          season: newState,
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
