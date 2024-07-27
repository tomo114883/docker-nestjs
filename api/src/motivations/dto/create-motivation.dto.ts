import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateMotivationSchema = z.object({
  id: z.number().optional(), // 自動生成されるのでオプショナル
  name: z.string(),
  weight: z.number().nullable().optional(),
  userId: z.number(),
  typeId: z.number().nullable().optional(),
  createdAt: z.string().datetime({ offset: true }).optional(), // 自動生成されるのでオプショナル
  updatedAt: z.string().datetime({ offset: true }).optional(), // 自動生成されるのでオプショナル
  deletedAt: z.string().datetime({ offset: true }).nullable().optional(),
});

export class CreateMotivationDto extends createZodDto(CreateMotivationSchema) {}
