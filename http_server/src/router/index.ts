import Router from 'koa-router';
import { view, api } from 'controller';
import koaBody from 'koa-body'

const formBody = koaBody({
  multipart: true,
})

const router = new Router()

router.get('/hz', view.getHzHandler)
router.get('/upload', view.getUploadHandler)
router.get(`/api/download/:fileName`, api.downloadFileHandler)
router.get(`/api/mutil_download`, api.mutilDownloadFileHandler)
router.get('/api/graphiql', api.getGraphqlHandler)
router.post('/api/upload', formBody, api.uploadFileHandler)

export default router
