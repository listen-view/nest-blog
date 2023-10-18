import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
  ManyToMany
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { Tag } from '../../tag/entities/tag.entity'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  cover: string

  @Column({ type: 'longtext' })
  content: string

  @Column({ type: 'int', default: 0 })
  readCount: number

  @Column()
  author: string

  @OneToMany(() => Comment, comment => comment.post)
  comment: Comment[]

  @ManyToOne(() => User, user => user.post)
  user: User

  @ManyToMany(() => Tag, tag => tag.post)
  @JoinTable()
  tag: Tag[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date
}
