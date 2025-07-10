import { IsOptional, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  idPedido?: number;

  //idUsuario?: number;

  @IsString()
  metodoPago?: string;

  //@IsNumber()
  //total?: number;
}
