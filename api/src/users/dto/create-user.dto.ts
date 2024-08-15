import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(20),
  name: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
