const fs = require('fs')

const localJson = require('./en.json')
console.log(localJson)
const terms = Object.keys(localJson)
console.log(terms)
const order_terms = terms.filter(item => item.startsWith('order.'))
const orders_terms = terms.filter(item => item.startsWith('orders.'))
const tracking_terms = terms.filter(item => item.startsWith('tracking.'))
const return_terms = terms.filter(item => item.startsWith('return.'))
const payment_fail = terms.filter(item => item.startsWith('app.error_msg.pay_fail'))
const payment_terms = terms.filter(item => !item.startsWith('app.payment.success')
  && !item.startsWith('app.error_msg.pay_fail')
  && (item.startsWith('app.') || item.startsWith('payment.'))
)

const payment_success = terms.filter(item => item.startsWith('app.payment.success') || item.startsWith('pay_success.') )
const order_refund = terms.filter(item => item.startsWith('order_refund.') || item.startsWith('refund.'))

const other_terms = terms.filter(item => {
  return !order_terms.includes(item)
    && !orders_terms.includes(item)
    && !tracking_terms.includes(item)
    && !return_terms.includes(item)
    && !payment_terms.includes(item)
    && !payment_success.includes(item)
    && !order_refund.includes(item)
    && !item.startsWith('auth_security')
})


fs.writeFileSync(
  './result/order.js',
  `const orderDetail = [${order_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/orders.js',
  `const orderList = [${orders_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/tracking.js',
  `const tracking = [${tracking_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/return.js',
  `const returnTerms = [${return_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/refund.js',
  `const order_refund = [${order_refund.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/fails.js',
  `const fails = [${payment_fail.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/pay.js',
  `const payTerms = [${payment_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/payment_success.js',
  `const successTerms = [${payment_success.map(item => `"${item}"`)}]`
)
fs.writeFileSync(
  './result/others.js',
  `const others = [${other_terms.map(item => `"${item}"`)}]`
)
fs.writeFileSync('./result/terms.js', `const cistyMapJsonStr = [${terms.map(item => `"${item}"`)}]`)
