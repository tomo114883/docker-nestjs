import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFactorSchema = z.object({
  id: z.number().optional(), // Is optional because of auto-generated.
  name: z.string(),
  weight: z.number(),
  variable: z.boolean().nullable().optional(), // Updated field
  userId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export class CreateFactorDto extends createZodDto(CreateFactorSchema) {}
