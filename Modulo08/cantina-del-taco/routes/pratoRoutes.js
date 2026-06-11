const router = require("express").Router();
const ctrl   = require("../controllers/pratoController");
const auth   = require("../middleware/auth");

router.get   ("/",      ctrl.listar);
router.get   ("/admin", auth, ctrl.listarTodos);
router.get   ("/:id",   ctrl.buscar);
router.post  ("/",      auth, ctrl.criar);
router.put   ("/:id",   auth, ctrl.atualizar);
router.delete("/:id",   auth, ctrl.remover);

module.exports = router;
