// File: src/platillo/platillo.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlatilloController } from './dishes.controller';
import { PlatilloService } from './dishes.service';

@Module({
  imports: [PrismaModule],
  controllers: [PlatilloController],
  providers: [PlatilloService],
})
export class PlatilloModule {}
