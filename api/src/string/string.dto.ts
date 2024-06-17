import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StringSchema = z.object({
  message: z.string({ message: 'メッセージには文字しか入力できません。' }),
});
export class StringDto extends createZodDto(StringSchema) {}
