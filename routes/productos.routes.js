const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  borrarProducto,
  actualizarProducto
} = require('../controllers/productos.controller');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [

], obtenerProducto);

router.post('/', [

], crearProducto);

router.put('/:id', [

], actualizarProducto);

router.delete('/:id', [

], borrarProducto);

module.exports = router;