const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
  const { query } = req;
  res.json({
    msg: 'get API',
    query
  });
}

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API',
    id
  });
}

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});
  
  // Encriptar contraseña (hash)
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  
  // Guardar en BD
  await usuario.save();

  res.json({
    msg: 'post API',
    usuario
  });
}

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API'
  });
}

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API'
  });
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
}