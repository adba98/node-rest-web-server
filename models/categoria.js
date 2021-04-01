const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  }
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

module.exports = model('Categoria', CategoriaSchema);