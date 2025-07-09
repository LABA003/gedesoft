import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PlatilloModule } from './modules/dishes/dishes.module';
import { PlatilloService } from './modules/dishes/dishes.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PrismaModule,
    UsuariosModule,
    AuthModule,
    PlatilloModule,
    OrdersModule,
    CategoriesModule,
    TicketsModule,
  ],
  providers: [PlatilloService],
})
export class AppModule {}
