const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  borrarProducto,
  actualizarProducto
} = require('../controllers/productos.controller');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const {
  validarCampos,
  validarJWT,
  esAdminRol
} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
  check('id', 'No es un id Mongo valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], obtenerProducto);

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de mongo').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], crearProducto);

router.put('/:id', [
  validarJWT,
  check('id').custom(existeProductoPorId),
  validarCampos
], actualizarProducto);

router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], borrarProducto);

module.exports = router;