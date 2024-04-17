const db = require("../models");
const payments = db.payments;

module.exports = {
  addPayments: async (req, res) => {
    const { payment_amount, payment_status, payment_transaction_number, discountId, created_by } =
      req.body;
    try {
      const newPayments = await payments.create({
        payment_amount,   
        payment_status,
        payment_transaction_number,
        discountId,
        created_by,
      });

      if (newPayments) {
        res.status(200).json({
          message: "Payment successfull",
          season: newPayments,
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
  updatePayments: async (req, res) => {
    const {  payment_amount, payment_status, payment_transaction_number, discountId, updated_by } =
      req.body;
      const { id } = req.query;
      console.log(id);
    try {
      const updatedPayment = await payments.update({
        payment_amount,   
        payment_status,
        payment_transaction_number,
        discountId,
        updated_by,
      }, {
        where: { id: id } 
      });
       console.log(updatedPayment);

      if (updatedPayment[0]===1) {
        res.status(200).json({
          message: "Payment updated successfully",
          payment: updatedPayment,
        });
      } else {
        res.status(404).json({
          message: "Payment not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  },

  deletePayment: async (req, res) => {
    const { id } = req.query;
    try {
      const deletedPayment = await payments.destroy({
        where: { id: id }
      });

      if (deletedPayment === 1) {
        res.status(200).json({
          message: "Payment deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Payment not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  },
  findAllPayments: async (req, res) => {
    try {
      const allPayments = await payments.findAll();

      if (allPayments.length > 0) {
        res.status(200).json({
          message: "Payments found successfully",
          payments: allPayments,
        });
      } else {
        res.status(404).json({
          message: "No payments found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  }
};
