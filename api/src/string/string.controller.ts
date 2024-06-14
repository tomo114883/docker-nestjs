import { Body, Controller, Get } from '@nestjs/common';
import { StringService } from './string.service';

@Controller('string')
export class StringController {
  constructor(private stringService: StringService) {}

  @Get('uppercase')
  getUpperCase(@Body() body: { message: string }): string {
    return this.stringService.upperCase(body.message);
  }
}
