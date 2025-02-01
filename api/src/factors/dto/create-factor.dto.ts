import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFactorSchema = z.object({
  name: z.string(),
  weight: z.number(),
  variable: z.boolean(),
  factorsSetId: z.number(),
});

export class CreateFactorDto extends createZodDto(CreateFactorSchema) {}
