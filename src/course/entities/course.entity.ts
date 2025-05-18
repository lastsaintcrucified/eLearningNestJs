import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Modules } from 'src/module/entities/module.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.courses)
  instructor: User;

  @OneToMany(() => Modules, (module) => module.course)
  modules: Modules[];
}
