const prefix = '/thirdPartyData/vehicleManage'
const { CarMatchInfo, CarInfo } = require('../db.js')

module.exports = [{
  api: `${prefix}/vehicleMatchs/list`, // 匹配信息数据
  method: 'get',
  async fn(ctx, next) {

    let { page, limit, brandName, seriesName, modelName, status, assetFrom } = ctx.request.query
    limit = +limit || 10

    const where = {}
    if (brandName) where.brandName = {
      $like: `%${brandName}%`
    }

    if (seriesName) where.seriesName = {
      $like: `%${seriesName}%`
    }

    if (modelName) where.modelName = {
      $like: `%${modelName}%`
    }

    if (assetFrom) where.assetFrom = {
      $like: `%${assetFrom}%`
    }

    if (status) where.status = status

    const result = await CarMatchInfo.findAndCountAll({
      where: where,
      offset: page ? (page - 1) * limit : 0,
      limit: limit,
      order: [
        ['update_time', 'DESC']
      ],
      include: [{
        model: CarInfo
        // as: 'carInfo'
      }]
    })

    ctx.body = {
      data: {
        rows: result.rows,
        total: result.count
      }
    }
  }
}]
