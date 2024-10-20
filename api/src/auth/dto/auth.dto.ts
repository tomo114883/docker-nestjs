import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(20),
});

export class AuthDto extends createZodDto(AuthSchema) {}
