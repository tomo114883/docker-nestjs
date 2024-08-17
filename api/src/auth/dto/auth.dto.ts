import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// validateUser-method
// Input data.
export const validateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string(),
});

export class ValidateUserDto extends createZodDto(validateUserSchema) {}

// Return value.
export const nonPassUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string(),
});

export class NonPassUserDto extends createZodDto(nonPassUserSchema) {}

// signIn-method
// Input data.
export const signInSchema = z.object({
  id: z.number().optional(), // Is optional because of auto-generated.
  name: z.string(),
});

export class SignInDto extends createZodDto(signInSchema) {}

// Return value.
export const accessTokenSchema = z.object({
  access_token: z.string(),
});

export class AccessTokenDto extends createZodDto(accessTokenSchema) {}
