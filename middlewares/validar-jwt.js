const { request, response } = require('express');
const JWT = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }
  try {
    const { uid } = JWT.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no valido - user no existente'
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no valido - user sin estado'
      });
    }

    req.usuario = usuario;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      msg: 'Token no valido'
    });
  }

}

module.exports = {
  validarJWT
}