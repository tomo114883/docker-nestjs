import { Controller, Get, Req } from '@nestjs/common';
import { get } from 'http';
import { StringService } from './string.service';

@Controller('string')
export class StringController {
  constructor(private readonly stringService: StringService) {}

  @Get('uppercase')
  getUpperCase(): string {
    return "";
  }
}
