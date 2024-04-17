const db = require("../models");
const registrations = db.registrations;

module.exports = {
  addRegistration: async (req, res) => {
    const { childId, paymentId, programId, seasonId, created_by } =
      req.body;
    try {
      const newRegistration = await registrations.create({
        childId,   
        paymentId,
        programId,
        seasonId,
        created_by,
      });

      if (newRegistration) {
        res.status(200).json({
          message: "Registered successfully",
          season: newRegistration,
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
