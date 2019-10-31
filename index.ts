import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-koa'

import registerPath from './init'
import router from 'router';
import config from 'config';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.CLUB_ENV !== 'prod',
  introspection: process.env.CLUB_ENV !== 'prod',
});

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
  console.log(`🚀 Server ready at ${config.host}:${config.port}`)
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
