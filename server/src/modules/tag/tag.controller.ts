import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query('keyword') keyword = '') {
    return this.tagService.findAll(keyword)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id)
  }
}
