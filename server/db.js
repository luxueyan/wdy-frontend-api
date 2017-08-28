const Sequelize = require('sequelize')
const config = require('config')
const changeCase = require('change-case')
const glob = require('glob')
const logger4 = require('./logger.js')
const path = require('path')

// 数据库连接
const sequelize = new Sequelize(config.get('mysql'))
const ept = { sequelize }

// change fieldName to snake_case
sequelize.beforeDefine((attrs, opts) => {
  const keys = Object.keys(attrs)
  keys.forEach(k => {
    attrs[k].field = changeCase.snakeCase(k)
  })
})

// 获取模型名字
function getModelName(modelData, f) {
  let modelName = ''

  if (modelData.name) {
    modelName = modelData.name
  } else {
    modelName = path.baseName(f).replace('Model.js', '')
    modelData.name = modelName
  }
  return modelName
}

// 模型定义
const files = glob.sync(`${__dirname}/**/*Model.js`)

const modelDatas = []
files.forEach(f => {
  const modelData = require(f)
  modelDatas.push(modelData)
  const modelName = getModelName(modelData, f)
  ept[modelName] = sequelize.define(changeCase.camelCase(modelName), modelData.fields, Object.assign({ tableName: changeCase.snakeCase(modelName) }, modelData.options || {}))
  logger4.info(`success register model ${modelName}`)
})

modelDatas.forEach(m => {
  if (m.relations) {
    Object.keys(m.relations).forEach(r => {
      // console.log(ept[m.relation.model], m.relation.model)
      ept[m.name][r](ept[m.relations[r].model], m.relations[r].option)
      logger4.info(`success register relations ${r}`)
    })
  }
})

module.exports = ept
