import { Body, Controller, Get } from '@nestjs/common';
import { StringService } from './string.service';
import { StringDto } from './string.dto';

@Controller('string')
export class StringController {
  constructor(private stringService: StringService) {}

  @Get('uppercase')
  getUpperCase(@Body() stringDto: StringDto): string {
    return this.stringService.upperCase(stringDto.message);
  }

  @Get('lowercase')
  getLowerCase(@Body() stringDto: StringDto): string {
    return this.stringService.lowerCase(stringDto.message);
  }
}
