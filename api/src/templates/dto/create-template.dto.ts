import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTemplateSchema = z.object({
  name: z.string(),
  factorsSetId: z.number(),
});

export class CreateTemplateDto extends createZodDto(CreateTemplateSchema) {}
