import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  register(@Body() registerUserDtp: RegisterUserDto) {
    const user = new this.userModel({
      email: registerUserDtp.email,
      displayName: registerUserDtp.displayName,
      password: registerUserDtp.password,
    });
    user.generateToken();
    return user.save();
  }
  @UseGuards(AuthGuard('local'))
  @Post('/sessions')
  login(@Req() req: Request<{ user: User }>) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('/secret')
  secret(@Req() req: Request<{ user: User }>) {
    return { user: req.user, message: 'Secret content' };
  }

  @Delete(':id')
  logout(@Param('id') id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
