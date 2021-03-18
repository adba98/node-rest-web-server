const JWT = require('jsonwebtoken');

const generarJWT = (uid = '') => {
  return new Promise((res, rej) => {
    const payload = { uid };

    JWT.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        rej('No se genero el token')
      } else {
        res(token);
      }
    })
  });
}

module.exports = {
  generarJWT
}