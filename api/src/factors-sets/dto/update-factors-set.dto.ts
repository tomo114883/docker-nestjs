import { PartialType } from '@nestjs/mapped-types';
import { CreateFactorsSetDto } from './create-factors-set.dto';

export class UpdateFactorsSetDto extends PartialType(CreateFactorsSetDto) {}
