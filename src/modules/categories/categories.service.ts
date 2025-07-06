import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCategoryDto) {
    return this.prisma.categoria.create({
      data: { nombre: dto.nombre },
    });
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }
}
