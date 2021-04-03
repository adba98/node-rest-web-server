const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models/index.models");

const cargarArchivo = async (req = request, res = response) => {
  try {
    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({ nombre });

  } catch (error) {
    res.status(400).json({ msg: `${error}` });
  }
}

const actualizarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  try {
    let modelo;
    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe el usauario con id: ${id}`
          });
        }
        break;
      case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe el producto con id: ${id}`
          });
        }
        break;
      default:
        res.status(500).json({
          msg: 'No se agrego la coleccion al actualizar'
        });
        break;
    }

    // Revisar y limpiar img previas
    if (modelo.img) {
      const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json({ modelo });
  } catch (error) {
    res.status(400).json({ msg: `${error}` });
  }
}

const mostrarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  try {
    let modelo;
    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe el usauario con id: ${id}`
          });
        }
        break;
      case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe el producto con id: ${id}`
          });
        }
        break;
      default:
        res.status(500).json({
          msg: 'No se agrego la coleccion al actualizar'
        });
        break;
    }

    // Revisar y limpiar img previas
    if (modelo.img) {
      const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImg);

  } catch (error) {
    res.status(400).json({ msg: `${error}` });
  }
}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen
}