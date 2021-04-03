const path = require("path");
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
  return new Promise((res, rej) => {
    const { archivo } = files;
    const nombreDividido = archivo.name.split('.');
    const extension = nombreDividido[nombreDividido.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return rej(`La extension ${extension} no es permitida.`, extensionesValidas)
    }

    const nombreTmp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);

    archivo.mv(uploadPath, (err) => {
      if (err) return rej(err);

      res(nombreTmp);
    });
  });
}

module.exports = {
  subirArchivo
}