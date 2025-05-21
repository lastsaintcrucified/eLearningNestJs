import { IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  duration: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
