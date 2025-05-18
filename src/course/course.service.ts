// src/course/course.service.ts
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  create(dto: CreateCourseDto, instructorId: number) {
    const course = this.courseRepo.create({
      ...dto,
      instructor: { id: instructorId },
    });
    return this.courseRepo.save(course);
  }

  findAll() {
    return this.courseRepo.find({ relations: ['instructor'] });
  }

  findOne(id: number) {
    return this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
  }

  async update(id: number, dto: UpdateCourseDto, instructorId: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructor.id !== instructorId)
      throw new ForbiddenException('Not your course');

    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async remove(id: number, instructorId: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructor.id !== instructorId)
      throw new ForbiddenException('Not your course');

    return this.courseRepo.remove(course);
  }
}
