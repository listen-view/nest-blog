import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { hashSync } from 'bcryptjs'
import { Exclude } from 'class-transformer'
import { Post } from '../../posts/entities/post.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 50 })
  userName: string

  @Column({ length: 50 })
  nickName: string

  @Column()
  password: string

  @Column({ default: '' })
  avatar: string

  @Column()
  email: string

  @OneToMany(() => Post, post => post.user)
  post: Post[]

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string

  @Column({
    type: 'timestamp',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date

  @Column({
    type: 'timestamp',
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password)
  }
}
