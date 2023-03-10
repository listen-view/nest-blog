import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTag: string | string[]) {
    const tagArr = Array.isArray(createTag) ? createTag : [createTag];
    const existingTags = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.content IN (:...names)', {
        names: tagArr.map((tag) => tag),
      })
      .getMany();
    const newTags = tagArr
      .filter(
        (tag) =>
          !existingTags.find((existingTag) => existingTag.content === tag),
      )
      .map((tag) => {
        return {
          content: tag,
        };
      });
    const tagIns = this.tagRepository.create(newTags);
    return await this.tagRepository.save(tagIns);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
