const { response, request, json } = require('express');
const { Producto } = require('../models/index.models');

const obtenerProductos = async (req = request, res = response) => {
  res.json({
    msg: 'Productos en DB'
  });
}

const obtenerProducto = async (req = request, res = response) => {
  res.json({
    msg: 'Producto en DB'
  });
}

const crearProducto = async (req = request, res = response) => {
  res.json({
    msg: "Se ha creado el Producto"
  });
}

const actualizarProducto = async (req = request, res = response) => {
  res.json({
    msg: 'Producto actualizado con exito'
  });
}

const borrarProducto = async (req = request, res = response) => {
  res.json({
    msg: 'Producto eliminado con exito'
  });
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}