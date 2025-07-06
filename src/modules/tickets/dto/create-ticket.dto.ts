import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  idPedido: number;

  @IsInt()
  idUsuario: number;

  @IsString()
  metodoPago: string;

  @IsNumber()
  total: number;
}
