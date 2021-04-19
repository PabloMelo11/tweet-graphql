import { buildSchema } from 'type-graphql';

import { Tweet } from './Tweet';
import { TweetController } from '../controllers/TweetController';

const schema = async () =>
  await buildSchema({
    resolvers: [Tweet, TweetController],
  });

export { schema };
