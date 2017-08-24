const Sequelize = require('sequelize')

module.exports = {
  name: 'CarInfo',
  fields: {
    id: {
      type: Sequelize.CHAR(32),
      primaryKey: true
    },
    serialNumber: {
      type: Sequelize.CHAR(255)
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
      type: Sequelize.STRING
    }
  }
}
