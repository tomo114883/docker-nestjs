import { Injectable } from '@nestjs/common';
import { CreateMotivationDto } from './dto/create-motivation.dto';
import { UpdateMotivationDto } from './dto/update-motivation.dto';

@Injectable()
export class MotivationsService {
  create(createMotivationDto: CreateMotivationDto) {
    return 'This action adds a new motivation';
  }

  findAll() {
    return `This action returns all motivations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motivation`;
  }

  update(id: number, updateMotivationDto: UpdateMotivationDto) {
    return `This action updates a #${id} motivation`;
  }

  remove(id: number) {
    return `This action removes a #${id} motivation`;
  }
}
