'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    id: DataTypes.STRING,
    status: DataTypes.ENUM,
    email: DataTypes.STRING,
    amount: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};