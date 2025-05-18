import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Role } from 'src/common/decorators/role.decorator';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('courses/:courseId/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Role('instructor')
  @Post()
  create(
    @Param('courseId') courseId: string,
    @Body() body: CreateModuleDto,
    @Request() req,
  ) {
    return this.moduleService.create(+courseId, body, req.user.id);
  }

  @Get()
  findAll(@Param('courseId') courseId: string) {
    return this.moduleService.findByCourse(+courseId);
  }

  @Role('instructor')
  @Patch(':moduleId')
  update(@Param('moduleId') id: string, @Body() body: UpdateModuleDto) {
    return this.moduleService.update(+id, body);
  }

  @Role('instructor')
  @Delete(':moduleId')
  remove(@Param('moduleId') id: string) {
    return this.moduleService.remove(+id);
  }
}
