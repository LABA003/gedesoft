import { Injectable, NotFoundException } from '@nestjs/common';
import { Platillo } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlatilloService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nombrePlatillo: string;
    ingredientes?: string;
    imagen?: string;
    precio: number;
    idCategoria: number;
  }): Promise<Platillo> {
    return this.prisma.platillo.create({
      data: {
        nombrePlatillo: data.nombrePlatillo,
        ingredientes: data.ingredientes,
        imagen: data.imagen,
        precio: data.precio,
        categoria: {
          connect: {
            idCategoria: data.idCategoria,
          },
        },
      },
    });
  }

  findAll(): Promise<Platillo[]> {
    return this.prisma.platillo.findMany({ include: { categoria: true } });
  }

  async findOne(id: number): Promise<Platillo> {
    const platillo = await this.prisma.platillo.findUnique({
      where: { idPlatillo: id },
      include: { categoria: true },
    });
    if (!platillo) throw new NotFoundException(`Platillo ${id} not found`);
    return platillo;
  }

  async update(
    id: number,
    data: Partial<{
      nombrePlatillo: string;
      ingredientes?: string;
      imagen?: string;
      precio: number;
      idCategoria?: number;
    }>,
  ): Promise<Platillo> {
    await this.findOne(id);

    // Si hay nueva categoría, usar connect
    const updateData: any = {
      nombrePlatillo: data.nombrePlatillo,
      ingredientes: data.ingredientes,
      imagen: data.imagen,
      precio: data.precio,
    };

    if (data.idCategoria) {
      updateData.categoria = {
        connect: { idCategoria: data.idCategoria },
      };
    }

    return this.prisma.platillo.update({
      where: { idPlatillo: id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Platillo> {
    await this.findOne(id);
    return this.prisma.platillo.delete({ where: { idPlatillo: id } });
  }
}
