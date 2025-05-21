import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Role } from 'src/common/decorators/role.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('modules/:moduleId/lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Role('instructor')
  @Post()
  create(
    @Param('moduleId') moduleId: string,
    @Body() body: CreateLessonDto,
    @Request() req,
  ) {
    return this.lessonService.create(+moduleId, body, req.user.id);
  }

  @Get()
  findAll(@Param('moduleId') moduleId: string) {
    return this.lessonService.findByModule(+moduleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findByLessonId(+id);
  }

  @Role('instructor')
  @Patch(':lessonId')
  update(@Param('lessonId') id: string, @Body() body: UpdateLessonDto) {
    return this.lessonService.update(+id, body);
  }

  @Role('instructor')
  @Delete(':lessonId')
  remove(@Param('lessonId') id: string) {
    return this.lessonService.remove(+id);
  }
}
