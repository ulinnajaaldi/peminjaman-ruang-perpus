import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  role: z.enum(["Admin", "User"]),
  password: z.string().min(8),
  noHP: z.string().min(10).max(15),
});

export type IUserSchema = z.infer<typeof UserSchema>;

export const UserLoginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
});

export type IUserLoginSchema = z.infer<typeof UserLoginSchema>;
