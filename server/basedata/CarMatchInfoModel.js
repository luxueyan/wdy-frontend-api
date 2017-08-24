const Sequelize = require('sequelize')

module.exports = {
  name: 'CarMatchInfo',
  fields: {
    id: {
      type: Sequelize.CHAR(32),
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
      type: Sequelize.STRING
    }
  }
}
