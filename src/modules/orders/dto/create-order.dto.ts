import { IsInt, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  idUsuario: number;

  @IsInt()
  numMesa: number;

  @IsArray()
  items: { idPlatillo: number; cantidad: number }[];
}
