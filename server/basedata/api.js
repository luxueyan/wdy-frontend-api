const prefix = '/thirdPartyData/vehicleManage'

module.exports = [{
  method: 'get',
  api: `${prefix}/vehicles/list`,
  fn: async(ctx, next) => {
    const CarInfo = require('../db.js').CarInfo

    let { page, limit } = ctx.request.query
    limit = +limit || 10

    const result = await CarInfo.findAndCountAll({
      offset: page ? (page - 1) * limit : 0,
      limit: limit,
      order: [
        ['update_time', 'DESC']
      ]
    })

    ctx.body = {
      data: {
        rows: result.rows,
        total: result.count
      }
    }
  }
}]
