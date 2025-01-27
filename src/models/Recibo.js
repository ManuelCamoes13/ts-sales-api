const sequelize = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Factura = require('./Factura')



const Recibo = sequelize.define('Recibo', {
  
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    formaPagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroCheque: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {tableName: 'recibos',
  timestamps: false,

});
// Definir associações
Recibo.hasMany(Factura, { foreignKey: 'recibo_id' });


module.exports = Recibo;