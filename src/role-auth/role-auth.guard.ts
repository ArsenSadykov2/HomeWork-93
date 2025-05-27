import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument, UserRole } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();

    const token = req.get('Authorization');
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user: UserDocument | null = await this.userModel.findOne({ token });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if ((user.role as UserRole) !== UserRole.ADMIN) {
      throw new UnauthorizedException('Доступ только для администраторов');
    }

    req.user = user;
    return true;
  }
}
