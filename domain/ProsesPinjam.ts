import { z } from "zod";

export const ProsesPinjamSchema = z.object({
  id: z.string().optional(),
  status: z.string(),
  userId: z.string().optional(),
});

export type IProsesPinjamSchema = z.infer<typeof ProsesPinjamSchema>;

export const ProsesPinjamAllSchema = z.object({
  id: z.string(),
  status: z.string(),
  user: z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    noHP: z.string()
  }),
  detailPeminjamanRuangan: z.array(
    z.object({
      ruangan: z.string(),
      date: z.string(),
      startHour: z.string(),
      endHour: z.string(),
      people: z.string(),
      necessity: z.string(),
      additional: z.string(),
      letterLink: z.nullable(z.string()),
      saprasPeminjaman: z.nullable(z.array(z.unknown()))
    })
  )
})


export type IProsesPinjamAllSchema = z.infer<typeof ProsesPinjamAllSchema>;