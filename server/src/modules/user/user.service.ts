import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async register(createUser: CreateUserDto) {
    const hasUser = await this.userRepository.findOne({
      where: { userName: createUser.userName },
    });
    if (hasUser)
      throw new HttpException('已存在该用户', HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(userName: string) {
    return await this.userRepository.findOne({
      where: { userName },
    });
  }

  async findUserPost(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        post: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
