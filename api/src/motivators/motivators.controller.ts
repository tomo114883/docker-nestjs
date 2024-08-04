import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';

@Controller('motivators')
export class MotivatorsController {
  constructor(private readonly motivatorsService: MotivatorsService) {}

  @Post()
  create(@Body() createMotivatorDto: CreateMotivatorDto) {
    return this.motivatorsService.create(createMotivatorDto);
  }

  @Get()
  findAll() {
    return this.motivatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.motivatorsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMotivatorDto: UpdateMotivatorDto,
  ) {
    return this.motivatorsService.update(+id, updateMotivatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.motivatorsService.remove(+id);
  }
}
