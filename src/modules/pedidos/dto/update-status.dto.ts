import { IsEnum } from 'class-validator';

export enum StatusPedido {
  PENDIENTE = 'PENDIENTE',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO',
}

export class UpdateStatusDto {
  @IsEnum(StatusPedido, {
    message:
      'Estado inválido. Opciones válidas: PENDIENTE,  ENTREGADO, CANCELADO',
  })
  estado: StatusPedido;
}
