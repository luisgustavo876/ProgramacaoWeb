const router = require('express').Router();
const ctrl = require('../controllers/alunoController');
const auth = require('../middleware/auth');

router.get('/', auth, ctrl.listar);
router.post('/', auth, ctrl.criar);

module.exports = router;
