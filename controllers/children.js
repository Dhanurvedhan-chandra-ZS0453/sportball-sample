const db = require("../models");
const parent = db.parents;
const Child = db.children;

module.exports = {
  getChildrenWithParent: async (req, res) => {
    try {
      const childrenWithParent = await Child.findAll({
        include: [
          {
            model:parent,
            // association: "parentId",
            required: false,
          },
        ],
      });

      if (childrenWithParent.length > 0) {
        res.status(200).json({
          message: "Fetched children with parent",
          children: childrenWithParent,
        });
      } else {
        res.status(404).json({
          message: "No children found",
        });
      }
    } catch (error) {
      console.error("Error fetching children with parent:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
