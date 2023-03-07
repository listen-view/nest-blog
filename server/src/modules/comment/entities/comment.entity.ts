import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'longtext' })
  content: string;

  @ManyToOne(() => Post, (post) => post.comment)
  post: Post;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;
}
