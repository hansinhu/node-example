/**
 * @file CouponController.ts
 * @Synopsis 优惠券相关页面 (/coupons/:fac)
 * @author xinghanhu@clubfactory.com
 * @date 2019-04-22
 */

import { Context } from 'koa'

// 优惠券控制器
class ViewController {
  constructor () {}

  async getHzHandler(ctx: Context, next: () => void): Promise<void> {
    ctx.state = {
      session: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      title: 'app'
    };
    await ctx.render('hz', {
      user: 'Hansin'
    })
  }

  async getUploadHandler(ctx: Context, next: () => void): Promise<void> {
    ctx.state = {
      session: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      title: 'app'
    };
    await ctx.render('upload', {
      user: 'Hansin'
    })
  }
}

export { ViewController }
export default new ViewController()
