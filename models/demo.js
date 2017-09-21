'use strict';
module.exports = function(sequelize, DataTypes) {
  var demo = sequelize.define('demo', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return demo;
};
