import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @Role('student')
  @Post()
  enroll(@Body() body: CreateEnrollmentDto, @Request() req) {
    return this.service.enroll(req.user.id, body.courseId);
  }

  @Role('student')
  @Get('me')
  myEnrollments(@Request() req) {
    return this.service.findUserEnrollments(req.user.id);
  }
}
