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

export const DetailPeminjamanRuanganSchema = z.object({
  idRuangan: z.string().optional(),
  idProsessPinjam: z.string().optional(),
  date: z.date(),
  endDate: z.date().optional(),
  startHour: z.string(),
  endHour: z.string(),
  people: z.string(),
  necessity: z.string(),
  additional: z.string().optional(),
  letterLink: z.string().optional(),
});

export type IDetailPeminjamanRuanganSchema = z.infer<
  typeof DetailPeminjamanRuanganSchema
>;
