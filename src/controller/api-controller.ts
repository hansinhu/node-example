/**
 * @file CouponController.ts
 * @Synopsis 优惠券相关页面 (/coupons/:fac)
 * @author xinghanhu@clubfactory.com
 * @date 2019-04-22
 */

import { Context } from 'koa'
import fs from 'fs'

// 优惠券控制器
class ApiController {
  constructor () {}

  async getGraphqlHandler(ctx: Context, next: () => void): Promise<void> {
    ctx.body = { user: 'Hansin' }
    next()
  }

  async uploadFileHandler(ctx: Context, next: () => void): Promise<void> {
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path);	// 创建可读流
    console.log(file.name)
    const upStream = fs.createWriteStream(`upload_files/${file.name}`);		// 创建可写流
    reader.pipe(upStream);	// 可读流通过管道写入可写流
    ctx.body = { 
      code: 0,
      message: '上传成功',
      data: `${ctx.request.host}/upload_files/${file.name}`
    }
    next()
  }

  async downloadFileHandler(ctx: Context, next: () => void): Promise<void> {
    const { fileName } = ctx.params
    ctx.body = fs.createReadStream(`upload_files/${fileName}`)
    next()
  }
}

export { ApiController }
export default new ApiController()
