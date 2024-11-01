import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { MotivatorsService } from './motivators.service';

@UseGuards(JwtAuthGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private readonly motivatorsService: MotivatorsService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateMotivatorDto) {
    return await this.motivatorsService.create(req.user.id, dto);
  }

  @Get()
  async findAll() {
    return await this.motivatorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.motivatorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMotivatorDto: UpdateMotivatorDto,
  ) {
    return await this.motivatorsService.update(+id, updateMotivatorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.motivatorsService.remove(+id);
  }
}
