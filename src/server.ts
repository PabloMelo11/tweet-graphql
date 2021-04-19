import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import './database';
import './database/schemas/Tweet';

import { schema as schemaFn } from './schemas';

const app = async () => {
  const schema = await schemaFn();

  const server = new ApolloServer({ schema });

  server.listen(4000, () => console.log('server is running on port 4000'));
};

app();
