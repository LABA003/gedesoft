import { Module } from '@nestjs/common';
import { UsuariosController } from './users.controller';
import { UsuariosService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
