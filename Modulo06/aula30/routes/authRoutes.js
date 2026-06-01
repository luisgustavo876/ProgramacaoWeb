const router = require('express').Router();
const ctrl = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/registrar', ctrl.registrar);
router.post('/login', ctrl.login);
router.get('/perfil', auth, ctrl.perfil);

module.exports = router;
