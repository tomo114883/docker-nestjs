import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const StringSchema = z.object({
  message: z.string(),
});
export class StringDto extends createZodDto(StringSchema) {}
