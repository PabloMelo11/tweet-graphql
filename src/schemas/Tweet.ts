import { Field, ID, ObjectType } from 'type-graphql';

import { ITweet } from '../database/schemas/Tweet';

@ObjectType()
class Tweet implements ITweet {
  @Field((type) => ID, { nullable: true })
  _id?: any;

  @Field({ nullable: false })
  author: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: true })
  likes: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

export { Tweet };
