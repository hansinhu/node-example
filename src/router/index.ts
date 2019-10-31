import Router from 'koa-router';
import { hz, api } from 'controller';

const router = new Router()

router.get('/hz', hz.getHandler)
router.get('/api/graphiql', api.getGraphqlHandler)

export default router
