module.exports = {
  appenders: [{
    "type": "console",
    "category": "console"
  }, {
    category: 'app',
    type: 'datefile',
    filename: './logs/app',
    alwaysIncludePattern: true,
    pattern: '-yyyy-MM-dd.log'
  }, {
    type: 'logLevelFilter',
    level: 'ERROR',
    category: 'err',
    appender: {
      type: 'datefile',
      filename: './logs/err',
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log'
    }
  }],
  replaceConsole: true,
  levels: {
    console: 'ALL',
    app: 'ALL',
    err: 'ERROR'
  }
  // pm2: true,
  // pm2InstanceVar: 'INSTANCE_ID'
}
// ALL TRACE DEBUG INFO WARN ERROR FATAL MARK OFF
