const db = require("../models");
const programs = db.programs;


module.exports = {
    programs: async (req, res) => {
      const program = await programs.findAll();
  
      if (program) {
        res.status(200).json({
          message: "Fetched programs",
          category: program,
        });
      } else {
        res.status(404).json({
          message: "Program not Found",
        });
      }
    },
  };
  