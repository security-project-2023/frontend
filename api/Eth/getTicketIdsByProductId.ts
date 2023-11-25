import { apiInstance } from "..";

export async function getTicketIdsByProductId(productId: string) {
  return await apiInstance().get(`/eth/${productId}`);
}
