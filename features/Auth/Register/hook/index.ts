"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type IUserSchema, UserSchema } from "@/domain/User";

export const useRegisterFeature = () => {
  const router = useRouter();

  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      role: "User",
      password: "",
      noHP: "",
    },
  });

  return {
    router,
    form,
  };
};
