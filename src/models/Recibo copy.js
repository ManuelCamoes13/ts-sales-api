const { Model, DataTypes } = require('sequelize');

class Recibo extends Model {
  static associate(models) {
    this.hasMany(models.Factura, { 
      foreignKey: 'recibo_id',
      as: 'facturas',
    });
  }
}



module.exports = (sequelize) => {
  Recibo.init(
    {
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
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Recibo',
      tableName: 'recibos',
    }
  );
  return Recibo;
};
