const db = require("../models");
const { children, parents } = db; 

module.exports = {
  addChildren: async (req, res) => {
    const { child_name, child_dob, child_age, parent_name, parent_email, parent_mobile, parent_street_address, 
        cityId, stateId, countryId, created_by } = req.body;

    const transaction = await db.sequelize.transaction();
    
    try {
      let newParent;
      const existingParent = await parents.findOne({ where: { parent_email } });

      if (existingParent) {
        newParent = existingParent;
      } else {
        newParent = await parents.create({
          parent_name,
          parent_email,
          parent_mobile,
          parent_street_address,
          cityId,
          stateId,
          countryId,
          created_by,
        }, { transaction });
      }

      const newChild = await children.create({
        child_name,
        child_dob,
        child_age,
        parentId: newParent.id, 
        created_by,
      }, { transaction });

      await transaction.commit();

      res.status(200).json({
        message: "Child and Parent added successfully",
        child: newChild,
        parent: newParent
      });
    } catch (error) {
      console.log(error);
      await transaction.rollback();

      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  },
};
