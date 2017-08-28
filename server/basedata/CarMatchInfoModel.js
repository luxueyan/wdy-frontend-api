const Sequelize = require('sequelize')

module.exports = {
  name: 'CarMatchInfo',
  fields: {
    id: {
      type: Sequelize.CHAR(32),
      autoIncrement: true,
      primaryKey: true
    },
    baseId: {
      type: Sequelize.CHAR(32)
    },
    assetFrom: {
      type: Sequelize.CHAR(20)
    },
    brandName: {
      type: Sequelize.CHAR(20)
    },
    seriesName: {
      type: Sequelize.CHAR(20)
    },
    modelName: {
      type: Sequelize.CHAR(128)
    },
    status: {
      type: Sequelize.CHAR(20)
    },
    updateTime: {
      type: Sequelize.DATE
    }
  },
  options: {
    comment: '车辆信息匹配表'
  },
  relations: {
    belongsTo: {
      model: 'CarInfo',
      option: {
        foreignKey: 'baseId'
        // as: 'carInfo' // 定义model 驼峰别名，否则会是最后的define内的snake case 形式的表名
      }
    }
  }
}
