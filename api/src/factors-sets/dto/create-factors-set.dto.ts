import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFactorsSetSchema = z.object({
  name: z.string(),
});

export class CreateFactorsSetDto extends createZodDto(CreateFactorsSetSchema) {}
