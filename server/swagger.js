const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const carInfo = yaml.safeLoad(fs.readFileSync(__dirname + '/basedata/CarInfo.yml'), 'utf8')
const user = yaml.safeLoad(fs.readFileSync(__dirname + '/user/User.yml'), 'utf8')

module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "大搜车网金社API",
    "description": "nodejs版的大搜车接口",
    "version": "1.0.0"
  },
  "host": "localhost:3000",
  "basePath": "/",
  "schemes": [
    "http",
    "https"
  ],
  "securityDefinitions": {
    "ApiKeyAuth": {
      "type": "apiKey",
      "in": "header",
      "name": "x-auth-token"
    }
  },
  "security": [{ "ApiKeyAuth": [] }],
  "paths": Object.assign({}, carInfo, user)
}
