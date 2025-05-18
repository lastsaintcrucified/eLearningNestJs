import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Role('instructor') // restrict to instructors
  create(@Body() dto: CreateCourseDto, @Request() req) {
    return this.courseService.create(dto, req.user.id);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Role('instructor')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @Request() req,
  ) {
    return this.courseService.update(+id, dto, req.user.id);
  }

  @Role('instructor') // restrict to instructors
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.courseService.remove(+id, req.user.id);
  }
}
