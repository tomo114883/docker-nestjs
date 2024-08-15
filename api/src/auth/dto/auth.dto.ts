import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const signInSchema = z.object({
  id: z.number().optional(), // Is optional because of auto-generated.
  name: z.string(),
});

export class signInDto extends createZodDto(signInSchema) {}

export const accessTokenSchema = z.object({
  access_token: z.string(),
});

export class accessTokenDto extends createZodDto(accessTokenSchema) {}

export const nonPassUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string(),
});

export class nonPassUserDto extends createZodDto(nonPassUserSchema) {}
