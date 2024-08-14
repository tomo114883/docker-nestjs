import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
