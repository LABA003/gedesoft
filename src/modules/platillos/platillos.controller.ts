import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlatillosService } from './platillos.service';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiTags('platillos')
@Controller('platillos')

export class PlatillosController {
  constructor(private readonly platillosService: PlatillosService) {}
  @ApiOperation({ summary: 'Create a new platillo' })
  @Post('create')
  create(@Body() data: CreatePlatilloDto) {
    return this.platillosService.create(data);
  }

  @ApiOperation({ summary: 'Get all platillos' })
  @Get()
  findAll() {
    return this.platillosService.findAll();
  }

  @ApiOperation({ summary: 'Get platillo by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platillosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update platillo by id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePlatilloDto) {
    return this.platillosService.update(+id, data);
  }

  @ApiOperation({ summary: 'Delete platillo by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platillosService.remove(+id);
  }
}
