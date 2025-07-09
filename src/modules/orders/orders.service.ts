import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, user: any) {
    // Verificar que el usuario exista
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: dto.idUsuario },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario ${dto.idUsuario} no encontrado`);
    }

    // Crear pedido
    const pedido = await this.prisma.pedido.create({
      data: {
        idUsuario: dto.idUsuario,
        numMesa: dto.numMesa,
      },
    });

    // Crear detalles
    for (const item of dto.items) {
      await this.prisma.detallePedido.create({
        data: {
          idPedido: pedido.idPedido,
          idPlatillo: item.idPlatillo,
          cantidad: item.cantidad,
        },
      });
    }

    // Obtener detalles completos
    const pedidoCompleto = await this.prisma.pedido.findUnique({
      where: { idPedido: pedido.idPedido },
      include: {
        usuario: true,
        detalles: {
          include: {
            platillo: true,
          },
        },
      },
    });

    return {
      message: 'Pedido creado correctamente',
      pedido: pedidoCompleto,
    };
  }
}
