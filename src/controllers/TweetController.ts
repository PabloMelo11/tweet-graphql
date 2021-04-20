import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';

import { Tweet, TweetPagination } from '../schemas/Tweet';

import MongoTweet from '../database/schemas/Tweet';

@Resolver(Tweet)
class TweetController {
  @Query(() => [Tweet], { name: 'tweets' })
  @Authorized()
  async find() {
    const tweets = await MongoTweet.find();

    return tweets;
  }

  @Query(() => TweetPagination)
  @Authorized()
  async tweetsPagination(
    @Arg('page') page: number,
    @Arg('pageSize') pageSize: number
  ) {
    const tweets = await MongoTweet.find()
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * page);

    const total = await MongoTweet.countDocuments();

    return { tweets, totalPages: Math.ceil(total / pageSize) };
  }

  @Query(() => Tweet, { name: 'tweet' })
  @Authorized()
  async findById(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists!');
    }

    return tweet;
  }

  @Mutation(() => Tweet, { name: 'createTweet' })
  @Authorized()
  async create(
    @Arg('author') author: string,
    @Arg('description') description: string
  ) {
    const tweet = await MongoTweet.create({
      author,
      description,
      likes: 0,
    });

    return tweet;
  }

  @Mutation(() => Tweet, { name: 'updateTweet' })
  @Authorized()
  async update(
    @Arg('id') id: string,
    @Arg('author') author?: string,
    @Arg('description') description?: string
  ) {
    const tweet = await MongoTweet.findByIdAndUpdate(
      id,
      { author, description },
      { new: true }
    );

    return tweet;
  }

  @Mutation(() => Tweet)
  @Authorized()
  async voteTweet(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists!');
    }

    tweet.set({ likes: tweet.likes + 1 });

    await tweet.save();

    return tweet;
  }

  @Mutation(() => Tweet)
  @Authorized()
  async downTweet(@Arg('id') id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error('Tweet does not exists!');
    }

    tweet.set({ likes: tweet.likes - 1 });

    await tweet.save();

    return tweet;
  }
}

export { TweetController };
