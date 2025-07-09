import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.usuario.create({
      data: {
        nombreUsu: dto.nombreUsu,
        email: dto.email,
        imagen: dto.imagen,
        password: hashedPassword,
        rol: dto.rol ?? 'MESERO',
      },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      select: {
        idUsuario: true,
        nombreUsu: true,
        email: true,
        imagen: true,
        rol: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { idUsuario: id },
      select: {
        idUsuario: true,
        nombreUsu: true,
        email: true,
        imagen: true,
        rol: true,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    let updateData: any = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: updateData,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { idUsuario: id },
    });
  }
}
