import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PlatilloService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('platillos')
export class PlatilloController {
  constructor(private readonly platilloService: PlatilloService) {}

  @Post('create')
  create(@Body() dto: CreateDishDto) {
    return this.platilloService.create(dto);
  }

  @Get()
  findAll() {
    return this.platilloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platilloService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateDishDto>) {
    return this.platilloService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platilloService.remove(+id);
  }
}
