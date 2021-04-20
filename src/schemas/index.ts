import { buildSchema } from 'type-graphql';

import { Tweet } from './Tweet';
import { TweetController } from '../controllers/TweetController';

import { User } from './User';
import { UserController } from '../controllers/UserController';

import { Auth } from './Auth';
import { SessionController } from '../controllers/SessionController';

import { AuthenticationAssurance } from '../middlewares/authenticationAssurance';

const schema = async () =>
  await buildSchema({
    resolvers: [
      Tweet,
      TweetController,
      User,
      UserController,
      Auth,
      SessionController,
    ],
    authChecker: AuthenticationAssurance,
  });

export { schema };
