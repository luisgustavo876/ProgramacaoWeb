const router = require("express").Router();
const ctrl   = require("../controllers/authController");

router.post("/registrar", ctrl.registrar);
router.post("/login",     ctrl.login);

module.exports = router;
