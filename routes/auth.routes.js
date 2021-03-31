const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCambios } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  validarCambios
], login);

router.post('/google', [
  check('id_token', 'El id token es necesario').not().isEmpty(),
  validarCambios
], googleSignIn);


module.exports = router;