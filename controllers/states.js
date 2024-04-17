const db = require("../models");
const states = db.states;


module.exports = {
    states: async (req, res) => {
      const state = await states.findAll();
  
      if (state) {
        res.status(200).json({
          message: "Fetched states",
          category: state,
        });
      } else {
        res.status(404).json({
          message: "state not Found",
        });
      }
    },
  };
  