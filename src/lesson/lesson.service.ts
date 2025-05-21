import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/module/entities/module.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
    @InjectRepository(Modules)
    private moduleRepo: Repository<Modules>,
  ) {}

  async create(moduleId: number, data: CreateLessonDto, userId: number) {
    const mod = await this.moduleRepo.findOne({
      where: { id: moduleId },
      relations: ['course', 'course.instructor'],
    });

    if (!mod) throw new NotFoundException('Module not found');
    if (mod.course.instructor.id !== userId)
      throw new ForbiddenException('You are not the instructor');

    const lesson = this.lessonRepo.create({ ...data, module: mod });
    return this.lessonRepo.save(lesson);
  }

  async findByModule(moduleId: number) {
    return this.lessonRepo.find({
      where: { module: { id: moduleId } },
      order: { order: 'ASC' },
    });
  }

  async findByLessonId(id: number) {
    return this.lessonRepo.find({
      where: { id },
    });
  }
  async update(id: number, data: UpdateLessonDto) {
    await this.lessonRepo.update(id, data);
    return this.lessonRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.lessonRepo.delete(id);
  }
}
