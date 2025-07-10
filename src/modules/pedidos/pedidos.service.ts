import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePedidoDto, user: any) {
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

  findAll() {
    return this.prisma.pedido.findMany();
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({ where: { idPedido: id } });
  }

  async update(id: number, data: UpdatePedidoDto) {
    await this.findOneOrFail(id);
    return this.prisma.pedido.update({ where: { idPedido: id }, data });
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    return this.prisma.pedido.delete({ where: { idPedido: id } });
  }

  private async findOneOrFail(id: number) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
  }
}
