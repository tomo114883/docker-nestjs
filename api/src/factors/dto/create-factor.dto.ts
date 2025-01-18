import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFactorSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  weight: z.number(),
  variable: z.boolean(),
  factorsSetId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export class CreateFactorDto extends createZodDto(CreateFactorSchema) {}
