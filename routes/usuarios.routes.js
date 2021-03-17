const { Router } = require('express');
const { check } = require('express-validator');

const { validarCambios } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste } = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
  check('rol').custom(esRolValido),
  //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
  validarCambios
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;