'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Coordinate,{
      as: 'coordinate',
      foreignKey: 'userId'
    })
  };
  return User;
};
