import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  name: z.string().min(1).max(20),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
