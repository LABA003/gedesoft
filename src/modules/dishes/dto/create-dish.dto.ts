import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateDishDto {
  @IsString()
  nombrePlatillo: string;

  @IsOptional()
  @IsString()
  ingredientes?: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNumber()
  precio: number;

  @IsInt()
  idCategoria: number;
}
