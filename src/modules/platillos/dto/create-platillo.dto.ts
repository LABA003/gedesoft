import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { TipoCategoria } from '../../../../generated/prisma';
import { ApiProperty } from '@nestjs/swagger';


export class CreatePlatilloDto {
  @ApiProperty({description: 'Nombre del platillo',})
  @IsString()
  nombrePlatillo: string;

  @ApiProperty({description: 'Descripción del platillo', required: false})
  @IsString()
  descripcion?: string;

  @ApiProperty({description: 'Imagen del platillo', required: false})
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({description: 'Precio del platillo'})
  @IsNumber()
  precio: number;

   @ApiProperty({description: 'Categoría del platillo', enum: TipoCategoria, required: false})
  @IsEnum(TipoCategoria)
  categoria?: TipoCategoria;

   @ApiProperty({description: 'Estado del platillo', required: false})
  @IsBoolean()
  status?: boolean;
}
