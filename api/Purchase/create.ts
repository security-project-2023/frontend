import { authInstance } from "..";

export interface Purchase {
  id: string;
  title: string;
  seat: string;
  price: number;
  time: Date;
  status: Status;
  user: any;
}

export enum Status {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELED = "canceled",
}

interface Request {
  title: string;
  seat: string;
  price: number;
  time: string;
}

export async function create(data: Request) {
  return await authInstance().post("/purchase", data);
}
