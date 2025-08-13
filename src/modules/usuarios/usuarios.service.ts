import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { idUsuario: id } });
  }

  async update(id: number, data: UpdateUsuarioDto) {
    await this.findOneOrFail(id);
    return this.prisma.usuario.update({ where: { idUsuario: id }, data });
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    return this.prisma.usuario.delete({ where: { idUsuario: id } });
  }

  private async findOneOrFail(id: number) {
    const usuario = await this.findOne(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
  }
}
