const db = require("../models");
const parents = db.parents;


module.exports = {
    parents: async (req, res) => {
      const parent = await parents.findAll();
  
      if (parent) {
        res.status(200).json({
          message: "Fetched parents",
          category: parent,
        });
      } else {
        res.status(404).json({
          message: "parent not Found",
        });
      }
    },
  };
  