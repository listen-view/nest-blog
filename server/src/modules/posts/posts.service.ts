import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async create(userName, createPost: CreatePostDto) {
    const user = await this.userService.findOne(userName);
    if (!user) throw new HttpException('不存在用户', 401);
    const exist = await this.postRepository.findOne({
      where: { title: createPost.title },
    });
    if (exist) throw new HttpException('已存在该文章', HttpStatus.BAD_REQUEST);
    const temp = await this.postRepository.create(createPost);
    temp.user = user;
    return await this.postRepository.save(temp);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        comment: true,
      },
    });
  }

  async update(id: number, updatePost: UpdatePostDto) {
    const exist = await this.postRepository.findOne({
      where: { id },
    });
    if (!exist) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST);
    return await this.postRepository.merge(exist, updatePost);
  }

  async remove(id: number) {
    const exist = await this.postRepository.findOne({
      where: { id },
    });
    if (!exist) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST);
    return await this.postRepository.remove(exist);
  }
}
