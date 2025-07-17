import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { RemovePlatillosDto } from './dto/remove-platillos.dto';

@Controller('pedidos')
@UseGuards(RolesGuard)
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('create')
  create(@Body() dto: CreatePedidoDto, @Req() req: Request & { user: any }) {
    return this.pedidosService.create(dto, req.user as any);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':idPedido')
  update(
    @Param('idPedido', ParseIntPipe) idPedido: number,
    @Body() dto: UpdatePedidoDto,
  ) {
    return this.pedidosService.update(idPedido, dto);
  }

  @Patch(':idPedido/eliminar-platillos')
  removePlatillos(
    @Param('idPedido', ParseIntPipe) idPedido: number,
    @Body() dto: RemovePlatillosDto,
  ) {
    return this.pedidosService.removePlatillosDelPedido(idPedido, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
