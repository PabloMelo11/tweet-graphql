import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import './database';
import './database/schemas/Tweet';
import './database/schemas/User';

import { schema as schemaFn } from './schemas';

const app = async () => {
  const schema = await schemaFn();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        token: req?.headers.authorization,
      };

      return context;
    },
  });

  server.listen(4000, () => console.log('server is running on port 4000'));
};

app();
