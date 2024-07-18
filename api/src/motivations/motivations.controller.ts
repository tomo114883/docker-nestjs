import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivationsService } from './motivations.service';
import { CreateMotivationDto } from './dto/create-motivation.dto';
import { UpdateMotivationDto } from './dto/update-motivation.dto';

@Controller('motivations')
export class MotivationsController {
  constructor(private readonly motivationsService: MotivationsService) {}

  @Post()
  create(@Body() createMotivationDto: CreateMotivationDto) {
    return this.motivationsService.create(createMotivationDto);
  }

  @Get()
  findAll() {
    return this.motivationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motivationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotivationDto: UpdateMotivationDto) {
    return this.motivationsService.update(+id, updateMotivationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motivationsService.remove(+id);
  }
}
