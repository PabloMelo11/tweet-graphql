import { Resolver, Mutation, Arg } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import auth from '../config/auth';

import { Auth } from '../schemas/Auth';
import MongoUser from '../database/schemas/User';

@Resolver(Auth)
class SessionController {
  @Mutation(() => Auth)
  async singIn(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await MongoUser.findOne({ email });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: `"${user._id}"`,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export { SessionController };
