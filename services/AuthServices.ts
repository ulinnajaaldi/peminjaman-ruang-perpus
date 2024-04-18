import type { IUserLoginSchema, IUserSchema } from "@/domain/User";
import { axiosInstance } from "@/lib/axios";

export const registerUser = async (values: IUserSchema) => {
  const response = await axiosInstance.post("/v1/api/auth/register", values);

  return response.data;
};

export const loginUser = async (values: IUserLoginSchema) => {
  const response = await axiosInstance.post("/v1/api/auth/login", values);

  return response.data;
};
