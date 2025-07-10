import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { TipoCategoria } from 'generated/prisma';

export class CreatePlatilloDto {
  @IsString()
  nombrePlatillo: string;

  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNumber()
  precio: number;

  @IsEnum(TipoCategoria)
  categoria?: TipoCategoria;

  @IsBoolean()
  status?: boolean;
}
