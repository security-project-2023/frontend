import { apiInstance } from "..";

export async function getTicketsByOwnerId(ownerId: string) {
  return await apiInstance().get(`/eth/owner/${ownerId}`);
}
