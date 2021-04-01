const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/* {{url}}/api/categorias */

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'GET Categorias'
  })
});

// Obtener una categoria con id - publico
router.get('/:id', (req, res) => {
  res.status(200).json({
    msg: 'GET Categoria'
  })
});

// Crear categoria - privado - cualquier token valido (rol)
router.post('/', (req, res) => {
  res.status(200).json({
    msg: 'POST Categoria'
  })
});

// Actualizar registro con id - privado - cualquier token valido (rol)
router.put('/:id', (req, res) => {
  res.status(200).json({
    msg: 'PUT Categoria'
  })
});

// Borrar categoria - Admin
router.delete('/:id', (req, res) => {
  res.status(200).json({
    msg: 'DELETE Categorias'
  })
});

module.exports = router;