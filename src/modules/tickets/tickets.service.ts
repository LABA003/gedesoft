import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTicketDto) {
    // Buscar pedido
    const pedido = await this.prisma.pedido.findUnique({
      where: { idPedido: dto.idPedido },
      include: {
        detalles: {
          include: { platillo: true },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido ${dto.idPedido} no encontrado`);
    }

    // Tomar idUsuario desde el pedido
    const idUsuario = pedido.idUsuario;
    if (!idUsuario) {
      throw new BadRequestException(`El pedido no tiene usuario asignado`);
    }

    // Calcular total
    let total = 0;
    for (const detalle of pedido.detalles) {
      total += detalle.platillo.precio * detalle.cantidad;
    }

    // Crear ticket
    const ticket = await this.prisma.ticket.create({
      data: {
        idPedido: dto.idPedido,
        idUsuario,
        metodoPago: dto.metodoPago,
        total,
      },
      include: {
        pedido: {
          include: {
            detalles: {
              include: { platillo: true },
            },
          },
        },
      },
    });

    return ticket;
  }

  findAll() {
    return this.prisma.ticket.findMany();
  }

  findOne(id: number) {
    return this.prisma.ticket.findUnique({ where: { idTicket: id } });
  }

  async update(id: number, data: UpdateTicketDto) {
    await this.findOneOrFail(id);
    return this.prisma.ticket.update({ where: { idTicket: id }, data });
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    return this.prisma.ticket.delete({ where: { idTicket: id } });
  }

  private async findOneOrFail(id: number) {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
  }
}
