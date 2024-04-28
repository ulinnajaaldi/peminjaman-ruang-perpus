import { z } from "zod";

export const RuanganSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  content: z.string().optional(),
  facilities: z.string().optional(),
  capacity: z.number().or(z.string()),
});

export type IRuanganSchema = z.infer<typeof RuanganSchema>;