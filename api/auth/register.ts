import { apiInstance } from "..";

interface Request {
  id: string;
  password: string;
}

export async function register(payload: Request) {
  return await apiInstance().post("/auth/signup", payload);
}
