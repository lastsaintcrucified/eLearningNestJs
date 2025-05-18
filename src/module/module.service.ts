import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/course/entities/course.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Modules)
    private moduleRepo: Repository<Modules>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(courseId: number, data: CreateModuleDto, userId: number) {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: ['instructor'],
    });

    if (!course) throw new NotFoundException('Course not found');
    if (course.instructor.id !== userId)
      throw new ForbiddenException('You are not the instructor of this course');

    const module = this.moduleRepo.create({ ...data, course });
    return this.moduleRepo.save(module);
  }

  async findByCourse(courseId: number) {
    return this.moduleRepo.find({
      where: { course: { id: courseId } },
      relations: ['lessons'],
      order: { order: 'ASC' },
    });
  }

  async update(id: number, data: UpdateModuleDto) {
    await this.moduleRepo.update(id, data);
    return this.moduleRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.moduleRepo.delete(id);
  }
}
