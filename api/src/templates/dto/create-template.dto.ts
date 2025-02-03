import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTemplateSchema = z.object({
  name: z.string(),
});

export class CreateTemplateDto extends createZodDto(CreateTemplateSchema) {}
