const { response, request } = require('express');

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

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: 'post API',
    nombre,
    edad
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