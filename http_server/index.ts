import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import nodeSchedule from 'node-schedule'
import { ApolloServer, gql, SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver } from 'graphql'

import registerPath from './init'
import router from 'router';
import config from 'config';

// Create (or import) a custom schema directive
class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args: any) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type Query {
    hello: String @upper
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (_parent: any, _args: any, _context: any) => {
      return 'Hello world!';
    },
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: UpperCaseDirective,
  },
  playground: process.env.CLUB_ENV !== 'prod',
  introspection: process.env.CLUB_ENV !== 'prod',
});

// 定时任务测试
function scheduleCronstyle(){
  nodeSchedule.scheduleJob('1 1 9-10 * * *', function(){
    console.log('scheduleCronstyle:' + new Date());
  }); 
}

scheduleCronstyle();

const app = new Koa();

server.applyMiddleware({ app });

app.use(server.getMiddleware({
  path: '/api/v1/app',
}))

// Must be used before any router is used
app.use(views(path.join(__dirname, './views'), {
  map: {
    html: 'ejs'
  },
}))

app.use(router.routes())

app.listen(config.port, () => {
  console.log(`🚀 Node Server ready at ${config.host}:${config.port}`)
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
