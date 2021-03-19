const { request, response } = require("express")


const esAdminRol = async (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar rol sin token'
    });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador`
    });
  }
  next();
}

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar rol sin token'
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Requiere uno de estos roles: ${roles}`
      });
    }
    req.usuario.rol
    next();
  }
}

module.exports = {
  esAdminRol,
  tieneRol
}