import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import secret from '../../config/secret';
@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: secret.token_key,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStorage],
  controllers: [AuthController],
})
export class AuthModule {}
