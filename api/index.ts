import express from 'express';
import { postgraphile } from 'postgraphile';

import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';

const postgraphileHandler = postgraphile(
  {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: 'db',
  },
  'public',
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PgSimplifyInflectorPlugin],
    jwtSecret: process.env.JWT_SECRET,
    jwtPgTypeIdentifier: 'public.jwt_token',
  },
);

const app = express();

app.use(postgraphileHandler);

app.listen(8000, () => {
  console.log('api is ready');
});
