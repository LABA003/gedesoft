import { IsInt, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { StatusTicket } from 'generated/prisma';

export class CreateTicketDto {
  @IsInt()
  idPedido: number;

  // @IsInt()
  //idUsuario: number;

  @IsString()
  metodoPago: string;

  //  @IsNumber()
  //total: number;

  //@IsOptional()
  //@IsEnum(StatusTicket, {
  // message: `El status debe ser uno de: ${Object.values(StatusTicket).join(', ')}`,
  //})
  //status?: StatusTicket;
}
