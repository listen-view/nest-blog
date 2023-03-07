import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import secret from '../../config/secret';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //获取token配置,
      ignoreExpiration: false, //自动拒绝过期token
      secretOrKey: secret.token_key,
    });
  }
  async validate(payload: User) {
    return await this.userService.findOne(payload.userName);
  }
}
