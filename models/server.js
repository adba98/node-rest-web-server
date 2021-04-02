const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios'
    }

    // Conectar DB
    this.conectarDB();

    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura de body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
    this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
    this.app.use(this.paths.productos, require('../routes/productos.routes'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

}

module.exports = Server;