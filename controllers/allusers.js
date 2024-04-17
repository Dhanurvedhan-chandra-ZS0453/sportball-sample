const db = require("../models");
const alluser = db.allusers;


module.exports = {
    allusers: async (req, res) => {
      const allusers = await alluser.findAll();
  
      if (allusers) {
        res.status(200).json({
          message: "Fetched allUsers",
          category: allusers,
        });
      } else {
        res.status(404).json({
          message: "User not Found",
        });
      }
    },
  };
  