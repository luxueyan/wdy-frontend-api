const Sequelize = require('sequelize')
const uuid = require('uuid')

module.exports = {
  name: 'CarInfo',
  fields: {
    id: {
      type: Sequelize.CHAR(32),
      defaultValue() {
        return uuid.v1().replace(/-/g, '') // remove - from uuid for field set
      },
      primaryKey: true
    },
    serialNumber: {
      type: Sequelize.CHAR(255)
    },
    brandName: {
      type: Sequelize.CHAR(20),
      unique: {
        args: 'brand_series_model_unique',
        msg: '汽车品牌+车系+车型不能重复'
      }
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
