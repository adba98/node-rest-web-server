const JWT = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }
  try {
    const {uid} = JWT.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    
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