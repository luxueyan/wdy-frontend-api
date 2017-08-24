const Log4js = require('koa-log4')
const log4Config = require('../log4js')

// logger
Log4js.configure(log4Config)

const appenders = ['app', 'err', 'console']
const logMethods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const loggers = []
const logger4 = {}

// add loggers
appenders.forEach(ap => {
  loggers.push(Log4js.getLogger(ap))
})

// add methods
logMethods.forEach(m => {
  logger4[m] = (logText) => {
    loggers.forEach(l => l[m](logText))
  }
})

module.exports = logger4
