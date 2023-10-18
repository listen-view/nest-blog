import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { TagService } from '../tag/tag.service'
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly tagService: TagService,
    private readonly userService: UserService
  ) {}

  async create(userName, createPost: CreatePostDto) {
    const user = await this.userService.findOne(userName)
    if (!user) throw new HttpException('不存在用户', 401)
    const exist = await this.postRepository.findOne({
      where: { title: createPost.title }
    })
    if (exist) throw new HttpException('已存在该文章', HttpStatus.BAD_REQUEST)
    const existTags = await this.tagService.create(createPost.tags, createPost.cover)
    try {
      const temp = await this.postRepository.create(createPost)
      temp.user = user
      temp.tag = existTags
      temp.author = userName

      return await this.postRepository.save(temp)
    } catch (e) {
      console.log(e)

      throw new HttpException('post error', HttpStatus.BAD_GATEWAY, { cause: e })
    }
  }

  async findAll(tag) {
    const query = await this.postRepository.createQueryBuilder('post')
    if (tag) {
      query.leftJoinAndSelect('post.tag', 'tag').where('tag.content = :tag', { tag })
    } else {
      query.leftJoinAndSelect('post.tag', 'tag')
    }
    return await query.getMany()
  }

  async findOne(id) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        comment: true
      }
    })
  }

  async update(id: number, updatePost: UpdatePostDto) {
    const exist = await this.postRepository.findOne({
      where: { id }
    })
    if (!exist) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST)
    return await this.postRepository.merge(exist, updatePost)
  }

  async remove(id: number) {
    const exist = await this.postRepository.findOne({
      where: { id }
    })
    if (!exist) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST)
    return await this.postRepository.remove(exist)
  }
}
