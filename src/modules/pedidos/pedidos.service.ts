import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { RemovePlatillosDto } from './dto/remove-platillos.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreatePedidoDto, user: any) {
    if (!user?.sub) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // Crear pedido
    const pedido = await this.prisma.pedido.create({
      data: {
        idUsuario: user.sub,
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
    if (!pedido) {
      throw new NotFoundException('Pedido no creado');
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
    return this.prisma.pedido.findUnique({
      where: { idPedido: id },
      include: {
        detalles: {
          include: {
            platillo: true,
          },
        },
      },
    });
  }
  //actualizar pedido
  async update(idPedido: number, dto: UpdatePedidoDto) {
    //  Validar que el pedido exista
    const pedido = await this.prisma.pedido.findUnique({
      where: { idPedido },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${idPedido} no encontrado`);
    }

    // . Si se proporcionan nuevos platillos, validarlos y agregarlos
    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        const platillo = await this.prisma.platillo.findUnique({
          where: { idPlatillo: item.idPlatillo },
        });

        if (!platillo) {
          throw new NotFoundException(
            `Platillo ${item.idPlatillo} no encontrado`,
          );
        }

        await this.prisma.detallePedido.create({
          data: {
            idPedido,
            idPlatillo: item.idPlatillo,
            cantidad: item.cantidad,
          },
        });
      }
    }

    //  Retornar el pedido actualizado completo
    const pedidoActualizado = await this.prisma.pedido.findUnique({
      where: { idPedido },
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
      message: 'Pedido actualizado correctamente',
      pedido: pedidoActualizado,
    };
  }
  //eliminar platillos
  async removePlatillosDelPedido(idPedido: number, dto: RemovePlatillosDto) {
    //  Verifica que el pedido exista
    const pedido = await this.prisma.pedido.findUnique({
      where: { idPedido },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido ${idPedido} no encontrado`);
    }

    //  Elimina los detallesPedido que coincidan con el idPedido y los idPlatillos dados
    await this.prisma.detallePedido.deleteMany({
      where: {
        idPedido: idPedido,
        idPlatillo: {
          in: dto.idPlatillos,
        },
      },
    });

    //  Devuelve el pedido actualizado
    const pedidoActualizado = await this.prisma.pedido.findUnique({
      where: { idPedido },
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
      message: 'Platillos eliminados del pedido correctamente',
      pedido: pedidoActualizado,
    };
  }
  //actualizar estado pedido

  async actualizarEstado(idPedido: number, dto: UpdateStatusDto) {
    // Verifica que el pedido exista
    const pedido = await this.prisma.pedido.findUnique({
      where: { idPedido },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido ${idPedido} no encontrado`);
    }

    // Actualiza el estado
    const pedidoActualizado = await this.prisma.pedido.update({
      where: { idPedido },
      data: {
        status: dto.estado,
      },
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
      message: `Estado del pedido actualizado a ${dto.estado}`,
      pedido: pedidoActualizado,
    };
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
