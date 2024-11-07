import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateMotivatorSchema = z.object({
  id: z.number().optional(), // Is optional because of auto-generated.
  name: z.string(),
  weight: z.number(),
  variable: z.boolean().nullable().optional(), // Updated field
  userId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export class CreateMotivatorDto extends createZodDto(CreateMotivatorSchema) {}

// export const ReceiveMotivatorSchema = z.object({
//   id: z.number().optional(), // Is optional because of auto-generated.
//   name: z.string(),
//   weight: z.number(),
//   variable: z.union([z.boolean(), z.string()]).nullable().optional(), // Updated field
//   userId: z.number().optional(),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
//   deletedAt: z.date().nullable().optional(),
// });

// export class ReceiveMotivatorDto extends createZodDto(ReceiveMotivatorSchema) {}
