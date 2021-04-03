const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');
const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
  validarArchivo,
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagen);

module.exports = router;