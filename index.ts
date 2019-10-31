import Koa from 'koa';
import views from 'koa-views';
import path from 'path';

import registerPath from './init'
import router from 'router';
import config from 'config';
const app = new Koa();

// Must be used before any router is used
app.use(views(path.join(__dirname, './views'), {
  map: {
    html: 'ejs'
  },
}))

app.use(router.routes())

app.listen(config.port, () => {
  console.log(`app listen on ${config.host}:${config.port}`)
  if (typeof process.send === 'function') {
    process.send('ready')
  }
})

process.on('exit', () => {
  process.exit()
})

process.on('SIGINT', () => {
  process.exit()
})

process.on('uncaughtException', (e) => {
  process.exit(-1)
})

registerPath()
