const { request, response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const login = async (req = request, res = response) => {

  const { correo, password } = req.body;

  try {

    // Verificar email existente
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no correctos - correo"
      })
    }
    // El usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no correctos - estado"
      })
    }

    const validarContraseña = bcryptjs.compareSync(password, usuario.password);
    if (!validarContraseña) {
      return res.status(400).json({
        msg: "Usuario / Password no correctos - pass"
      });
    }
    // Generar JWT

    res.json({
      msg: "Login ok",
      correo,
      password
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error: ${e}`
    })
  }
}

module.exports = {
  login
}