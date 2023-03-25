import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Exclude()
  id: number;

  @Exclude()
  userName?: string;

  @Exclude()
  password?: string;

  nickName?: string;
  email?: string;
  avatar?: string;
}
