import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
