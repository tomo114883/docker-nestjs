import { PartialType } from '@nestjs/mapped-types';
import { CreateMotivatorDto } from './create-motivator.dto';

export class UpdateMotivatorDto extends PartialType(CreateMotivatorDto) {}
