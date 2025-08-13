import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { StatusPedido } from '../../../../generated/prisma';
import { Type } from 'class-transformer';

class OrderItem {
  @IsInt()
  idPlatillo: number;

  @IsInt()
  cantidad: number;
}

export class CreatePedidoDto {
  //@IsInt()
  //idUsuario?: number;

  @IsInt()
  numMesa: number;

  //@IsDateString()
  //fecha?: string;

 // @IsEnum(StatusPedido)
  //status?: StatusPedido;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];
}
