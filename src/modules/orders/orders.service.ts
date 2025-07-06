import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const pedido = await this.prisma.pedido.create({
      data: {
        idUsuario: dto.idUsuario,
        numMesa: dto.numMesa,
      },
    });

    for (const item of dto.items) {
      await this.prisma.detallePedido.create({
        data: {
          idPedido: pedido.idPedido,
          idPlatillo: item.idPlatillo,
          cantidad: item.cantidad,
        },
      });
    }

    return pedido;
  }
}
