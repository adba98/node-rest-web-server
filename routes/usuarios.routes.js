const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCambios,
  validarJWT,
  esAdminRol,
  tieneRol
} = require('../middlewares/index');

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId
} = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCambios
], usuariosPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
  check('rol').custom(esRolValido),
  //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
  validarCambios
], usuariosPost);

router.delete('/:id', [
  validarJWT,
  //esAdminRol,
  tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCambios
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;