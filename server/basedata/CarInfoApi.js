const prefix = '/thirdPartyData/vehicleManage'
const { CarInfo } = require('../db.js')

module.exports = router => {
  // 基础车型数据列表
  router.get(`${prefix}/vehicles/list`, async(ctx, next) => {
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
  })

  // 查看基础车型详情
  router.get(`${prefix}/vehicles/details/:id`, async(ctx, next) => {
    const params = ctx.params
    const carInfo = await CarInfo.findById(params.id)

    ctx.body = {
      data: carInfo
    }
  })

  router.post(`${prefix}/vehicles/create`, async(ctx, next) => {
    const data = Object.assign({
      updateTime: Date()
    }, ctx.request.body)

    const result = await CarInfo.create(data).catch(err => Promise.resolve(err))

    if (!result.errors) {
      ctx.body = {
        data: data
      }
    } else {
      ctx.body = {
        resultCode: 'FAILED',
        resultMsg: result.errors
      }
    }
  })

  // 更新基础车型
  router.post(`${prefix}/vehicles/update`, async(ctx, next) => {
    const data = Object.assign({}, ctx.request.body, {
      updateTime: Date()
    })

    const result = await CarInfo.update(data, { where: { id: data.id } }).catch(err => Promise.resolve(err))

    if (result[0]) {
      ctx.body = {
        data: data
      }
    } else {
      ctx.body = {
        resultCode: 'FAILED',
        resultMsg: result.errors
      }
    }
  })
}
