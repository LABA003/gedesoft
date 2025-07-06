import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DishesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDishDto) {
    return this.prisma.platillo.create({
      data: {
        nombrePlatillo: dto.nombrePlatillo,
        ingredientes: dto.ingredientes,
        imagen: dto.imagen,
        precio: dto.precio,
        idCategoria: dto.idCategoria,
      },
    });
  }

  findAll() {
    return this.prisma.platillo.findMany({ include: { categoria: true } });
  }
}
