import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';

@Module({
  controllers: [DishesController]
})
export class DishesModule {}
