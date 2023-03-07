import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Post, (post) => post.tag)
  post: Post[];

  @Column({ type: 'tinytext' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;
}
