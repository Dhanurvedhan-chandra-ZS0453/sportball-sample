const db = require("../models");
const registrations = db.registrations;


module.exports = {
    registrations: async (req, res) => {
      const registration = await registrations.findAll();
  
      if (registration) {
        res.status(200).json({
          message: "Fetched registrations",
          category: registration,
        });
      } else {
        res.status(404).json({
          message: "registration not Found",
        });
      }
    },
  };
  