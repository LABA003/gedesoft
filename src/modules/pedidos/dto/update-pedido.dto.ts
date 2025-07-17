import {
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePlatilloItemDto {
  @IsInt()
  idPlatillo: number;

  @IsInt()
  @Min(1)
  cantidad: number;
}

export class UpdatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePlatilloItemDto)
  items?: UpdatePlatilloItemDto[];
}
