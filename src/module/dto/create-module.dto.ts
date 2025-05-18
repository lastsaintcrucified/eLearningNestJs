import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
