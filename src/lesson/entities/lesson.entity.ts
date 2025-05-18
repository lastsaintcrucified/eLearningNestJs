// src/lesson/entities/lesson.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Modules } from 'src/module/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Modules, (module) => module.lessons, { onDelete: 'CASCADE' })
  module: Modules;
}
