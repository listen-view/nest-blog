import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validate(userName: string, password: string) {
    const user = await this.userService.findOne(userName);
    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(payload: User) {
    return {
      access_token: this.jwtService.sign({
        id: payload.id,
        userName: payload.userName,
      }),
    };
  }
}
