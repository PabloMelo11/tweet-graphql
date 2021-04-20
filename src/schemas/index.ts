import { buildSchema } from 'type-graphql';

import { Tweet } from './Tweet';
import { TweetController } from '../controllers/TweetController';

import { User } from './User';
import { UserController } from '../controllers/UserController';

const schema = async () =>
  await buildSchema({
    resolvers: [Tweet, TweetController, User, UserController],
  });

export { schema };
