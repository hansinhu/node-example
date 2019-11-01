import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-koa'
import { GraphQLScalarType, Kind } from 'graphql'

import registerPath from './init'
import router from 'router';
import config from 'config';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # 注释 (#) 符号.

  enum AllowedColor {
    RED
    GREEN
    BLUE
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }
  

  # Query类型定义了数据图支持的读取操作
  type Query {
    getBooks: [Book]
    getAuthors: [Author]
    favoriteColor: AllowedColor
    avatar(borderColor: AllowedColor): String
  }

  # Mutation类型定义了支持的写入操作。
  type Mutation {
    addBook(title: String, author: String): Book

    # This mutation takes id and email parameters and responds with a User
    updateUserEmail(id: ID!, email: String!): UpdateUserEmailMutationResponse
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  type UpdateUserEmailMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: { name: 'J.K. Rowling' },
  },
  {
    title: 'Jurassic Park',
    author: { name: 'Michael Crichton' },
  },
];

const authors = [
  {
    books: books,
    name: 'J.K. Rowling',
  },
  {
    books: books,
    name: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  AllowedColor: {
    RED: '#f00',
    GREEN: '#0f0',
    BLUE: '#00f',
  },
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
    favoriteColor: () => 'RED',
    avatar: (parent: any, args: any) => {
      // args.borderColor is 'RED', 'GREEN', or 'BLUE'
    },
  }
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
