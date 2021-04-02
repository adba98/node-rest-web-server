const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria, actualizarCategoria } = require('../controllers/categorias.controller');
const { validarJWT, validarCampos,  esAdminRol } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/* {{url}}/api/categorias */
// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria con id - publico
router.get('/:id', [
  check('id', 'No es un id Mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier token valido (rol)
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

// Actualizar registro con id - privado - cualquier token valido (rol)
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], actualizarCategoria);

// Borrar categoria - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria);

module.exports = router;