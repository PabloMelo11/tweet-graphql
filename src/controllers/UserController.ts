import { hash } from 'bcryptjs';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';

import { User } from '../schemas/User';
import MongoUser from '../database/schemas/User';

@Resolver(User)
class UserController {
  @Query(() => [User], { name: 'users' })
  async find() {
    const users = await MongoUser.find().select([
      '_id',
      'name',
      'email',
      'createdAt',
      'updatedAt',
    ]);

    return users;
  }

  @Query(() => User, { name: 'user' })
  async findById(@Arg('id') id: string) {
    const user = await MongoUser.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 8);

    const userExists = await MongoUser.findOne({ email });

    if (userExists) {
      throw new Error('User already exists!');
    }

    const user = await MongoUser.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export { UserController };
