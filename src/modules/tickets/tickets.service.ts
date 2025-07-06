import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: {
        idPedido: dto.idPedido,
        idUsuario: dto.idUsuario,
        metodoPago: dto.metodoPago,
        total: dto.total,
      },
    });
  }
}
