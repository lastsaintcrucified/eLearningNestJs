import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private repo: Repository<Enrollment>,
  ) {}

  async enroll(userId: number, courseId: number) {
    const exists = await this.repo.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
      relations: ['user', 'course'],
    });

    if (exists) {
      throw new BadRequestException('Already enrolled');
    }

    const enrollment = this.repo.create({
      user: { id: userId },
      course: { id: courseId },
    });

    return this.repo.save(enrollment);
  }

  async findUserEnrollments(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['course', 'course.instructor', 'user'],
    });
  }
}
