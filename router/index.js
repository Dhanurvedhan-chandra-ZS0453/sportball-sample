const express = require("express");
const router = express.Router();
const session = require('express-session');
const controllers = require("../controllers/index");
const passport = require('../middlewares/auth');
const authenticate = require('../middlewares/authenticate');
 const util = require('../util/util');


// util.mailFunction().then(transporter => {
//     transporter.verify((err, success) => {
//       err
//         ? console.log(err)
//         : console.log(`=== Server is ready to take messages: ${success} ===`);
//     });
//   }).catch(error => {
//     console.error("Error in obtaining transporter:", error);
//   });

// util.outlookmail().then(outlooktransporter => {
//     outlooktransporter.verify((err, success) => {
//       err
//         ? console.log(err)
//         : console.log(`=== Server is ready to take messages: ${success} ===`);
//     });
//   }).catch(error => {
//     console.error("Error in obtaining transporter:", error);
//   });

router.use(session({
    secret: 'SFGG%$#974KG',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.route("/").get( controllers.allusers);

router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}));

router.get('/callback', passport.authenticate('auth0', {
    successRedirect: '/users',
    failureRedirect: '/'
}));

router.get('/users',authenticate.ensureAuthenticated, controllers.allusers);
router.route("/seasons").get( controllers.seasons).post(controllers.addSeasons);
router.route("/cities").get(controllers.cities).post(controllers.addcities);
router.route("/states").get(controllers.states).post(controllers.addstates);
router.route("/countries").get(controllers.countries).post(controllers.addcountries);
router.route("/merchants").get(controllers.merchants).post(controllers.addmerchants);
router.route("/discounts").get(controllers.discounts).post(controllers.addDiscount);
router.route("/products").get(controllers.products).post(controllers.addProduct);
router.route("/programs").get(controllers.programs).post(controllers.addProgram);
router.route("/children").get(controllers.children).post(controllers.addchildren);
router.route("/registration").get(controllers.registrations).post(controllers.addRegistrations);
router.route("/payments").get(controllers.allPayments).post(controllers.addPayments).put(controllers.updatePayments).delete(controllers.deletePayments);
router.route("/eventcount").get(controllers.eventcount);
// router.route("/email").post(controllers.sendemail);
// router.route("/outlook").post(controllers.outlookmail);

module.exports = router;