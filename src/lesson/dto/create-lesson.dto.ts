import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
