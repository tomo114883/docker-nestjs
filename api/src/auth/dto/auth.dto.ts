import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// validateUser-method
// Input data.
export const validateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string(),
});

export class validateUserDto extends createZodDto(validateUserSchema) {}

// Return value.
export const nonPassUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string(),
});

export class nonPassUserDto extends createZodDto(nonPassUserSchema) {}

// signIn-method
// Input data.
export const signInSchema = z.object({
  id: z.number().optional(), // Is optional because of auto-generated.
  name: z.string(),
});

export class signInDto extends createZodDto(signInSchema) {}

// Return value.
export const accessTokenSchema = z.object({
  access_token: z.string(),
});

export class accessTokenDto extends createZodDto(accessTokenSchema) {}
