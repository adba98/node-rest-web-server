const { request, response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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

    // Verificar contraseña
    const validarContraseña = bcryptjs.compareSync(password, usuario.password);
    if (!validarContraseña) {
      return res.status(400).json({
        msg: "Usuario / Password no correctos - pass"
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login ok",
      usuario,
      token
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error: ${e}`
    })
  }
}

const googleSignIn = async (req = request, res = response) => {

  const { id_token } = req.body;
  
  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login Google Sign In"
    });
  } catch (e) {
    return res.status(400).json({
      msg: `Token de Google no valido: ${e}`
    })
  }
}

module.exports = {
  login,
  googleSignIn
}