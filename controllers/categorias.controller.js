const { response, request, json } = require('express');
const { Categoria } = require('../models/index.models');

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true }
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    msg: 'Categorias en DB',
    total,
    categorias
  });
}

const obtenerCategoria = async (req = request, res = response) => {

  const { id } = req.params;
  const categoria = await Categoria.findById(id)
    .populate('usuario', 'nombre');

  res.json({
    msg: 'Categorias en DB',
    categoria
  });

}

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`
    });
  }

  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = new Categoria(data);
  await categoria.save();

  res.json({
    msg: "Se ha creado la categoria",
    categoria
  });
}

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.json({
    msg: 'categoria actualizada con exito',
    categoria
  });

}

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
  res.json({
    msg: 'categoria eliminada con exito',
    categoria
  });
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}