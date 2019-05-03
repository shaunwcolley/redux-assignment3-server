'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinate = sequelize.define('Coordinate', {
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {});
  Coordinate.associate = function(models) {
    // associations can be defined here
  };
  return Coordinate;
};