const prefix = '/thirdPartyData/vehicleManage'
const { CarInfo } = require('../db.js')

module.exports = [{
  api: `${prefix}/vehicles/list`, // 基础车型数据列表
  method: 'get',
  async fn(ctx, next) {

    let { page, limit, brandName, seriesName, modelName } = ctx.request.query
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

    const result = await CarInfo.findAndCountAll({
      where: where,
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
}, {
  api: `${prefix}/vehicles/details/:id`, // 查看基础车型详情
  method: 'get',
  async fn(ctx, next) {
    const params = ctx.params
    const carInfo = await CarInfo.findById(params.id)

    ctx.body = {
      data: carInfo
    }
  }
}, {
  api: `${prefix}/vehicles/create`, // 新增基础车型
  method: 'post',
  async fn(ctx, next) {
    const data = Object.assign({
      updateTime: Date()
    }, ctx.request.body)

    const result = await CarInfo.create(data)

    if (result[0]) {
      ctx.body = {
        data: data
      }
    } else {
      ctx.body = {
        resultCode: 'FAILED',
        resultMsg: '创建失败'
      }
    }
  }
}, {
  api: `${prefix}/vehicles/update`, // 更新基础车型
  method: 'post',
  async fn(ctx, next) {
    const data = Object.assign({}, ctx.request.body, {
      updateTime: Date()
    })

    const result = await CarInfo.update(data, { where: { id: data.id } })

    if (result[0]) {
      ctx.body = {
        data: data
      }
    } else {
      ctx.body = {
        resultCode: 'FAILED',
        resultMsg: '更新失败'
      }
    }
  }
}]
