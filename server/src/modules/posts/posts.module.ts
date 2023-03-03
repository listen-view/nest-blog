import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostsController],
  exports: [PostsService],
  providers: [PostsService],
})
export class PostsModule {}
