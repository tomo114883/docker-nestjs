import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFactorsSetSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  userId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export class CreateFactorsSetDto extends createZodDto(CreateFactorsSetSchema) {}
