const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true }
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    msg: 'Usuario(s) listado(s) con exito (GET)',
    total,
    usuarios
  });
}

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;

  // TODO contra validar BD
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: 'Usuario actualizado con exito (PUT)',
    usuario
  });
}

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar contraseña (hash)
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    msg: 'Usuario creado con exito (POST)',
    usuario
  });
}

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  /* Borrado fisico
  const usuario = await Usuario.findByIdAndDelete(id); */

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); 

  res.json({
    msg: 'Usuario eliminado con exito (DELETE)',
    id
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