import Router from 'koa-router';
import { hzController } from 'controller';

const router = new Router()

router.get('/hz', hzController.getHandler)
router.get('/graphiql', hzController.getHandler)

export default router
