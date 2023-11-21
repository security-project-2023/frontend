import { apiInstance } from "..";

interface Request {
  id: string;
  password: string;
}

export async function login(payload: Request) {
  return await apiInstance().post("/auth/signin", payload);
}
