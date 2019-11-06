/**
 * @file CouponController.ts
 * @Synopsis 优惠券相关页面 (/coupons/:fac)
 * @author xinghanhu@clubfactory.com
 * @date 2019-04-22
 */

import { Context } from 'koa'
import fs from 'fs'
import koaSend from 'koa-send'

// 优惠券控制器
class ApiController {
  constructor () {}

  async getGraphqlHandler(ctx: Context, next: () => void): Promise<void> {
    ctx.body = { user: 'Hansin' }
    next()
  }

  async uploadFileHandler(ctx: Context, next: () => void): Promise<void> {
    if (ctx.request.files) {
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
    } else {
      ctx.body = { 
        code: 0,
        message: '未选择文件',
      }
    }
    next()
  }

  async downloadFileHandler(ctx: Context, next: () => void): Promise<void> {
    const { fileName } = ctx.params
    ctx.body = fs.createReadStream(`upload_files/${fileName}`)
    next()
  }

  async mutilDownloadFileHandler(ctx: Context, next: () => void): Promise<void> {
    const { files } = ctx.request.query
    if (!files) {
      ctx.body = {
          message: '缺少必要参数：files',
      }
      return
    }
    const fileList = files.split(',').map((fileName: string) => {
      return decodeURIComponent(fileName)
    })
    if (fileList.length === 1) {
      // 单个文件直接下载
      console.log(fileList[0])
      const filePath = `upload_files/${fileList[0]}`
      ctx.attachment(filePath);
      await koaSend(ctx, filePath)
    } else {
      // 多个文件打包压缩下载
      console.log('fileList', fileList)
      ctx.body = '下载'
    }
    next()
  }
}

export { ApiController }
export default new ApiController()
