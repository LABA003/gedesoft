import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItem {
  @IsInt()
  idPlatillo: number;

  @IsInt()
  cantidad: number;
}

export class CreateOrderDto {
  @IsInt()
  idUsuario: number;

  @IsInt()
  numMesa: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];
}
