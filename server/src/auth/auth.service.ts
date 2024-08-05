import { Injectable } from '@nestjs/common';
import { LogInDto } from './logIn.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async logIn(
    credentials: LogInDto,
  ): Promise<{ userId: Types.ObjectId } | false> {
    const { email, password } = credentials;
    const user = await this.userModel.findOne({ email, password });

    if (!user) return false;

    return { userId: user._id };
  }
}
