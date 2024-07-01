import { Body, Controller, Put } from '@nestjs/common';
import { StringService } from './string.service';
import { StringDto } from './dto/string.dto';

@Controller('string')
export class StringController {
  constructor(private stringService: StringService) {}

  @Put('uppercase')
  getUpperCase(@Body() stringDto: StringDto): string {
    return this.stringService.upperCase(stringDto.message);
  }

  @Put('lowercase')
  getLowerCase(@Body() stringDto: StringDto): string {
    return this.stringService.lowerCase(stringDto.message);
  }
}
