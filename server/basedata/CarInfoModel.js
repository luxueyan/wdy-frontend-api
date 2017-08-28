const Sequelize = require('sequelize')

module.exports = {
  name: 'CarInfo',
  fields: {
    id: {
      type: Sequelize.CHAR(32),
      autoIncrement: true,
      primaryKey: true
    },
    serialNumber: {
      type: Sequelize.CHAR(255)
    },
    brandName: {
      type: Sequelize.CHAR(20),
      unique: 'brand_series_model_unique'
    },
    seriesName: {
      type: Sequelize.CHAR(20),
      unique: 'brand_series_model_unique'
    },
    modelName: {
      type: Sequelize.CHAR(128),
      unique: 'brand_series_model_unique'
    },
    year: {
      type: Sequelize.CHAR(128)
    },
    guidePrice: {
      type: Sequelize.DECIMAL(19, 2)
    },
    residualValue: {
      type: Sequelize.DECIMAL(19, 2)
    },
    marketPrice: {
      type: Sequelize.CHAR(128)
    },
    dataSource: {
      type: Sequelize.CHAR(28)
    },
    updateTime: {
      type: Sequelize.DATE
    }
  },
  options: {
    comment: '车辆基础信息表'
  },
  relations: {
    hasMany: {
      model: 'CarMatchInfo',
      option: {
        foreignKey: 'baseId',
        sourceKey: 'id'
      }
    }
  }
}
