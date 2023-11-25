import { apiInstance } from "..";

export enum Age {
  ALL = "all",
  OVER_12 = "over_12",
  OVER_15 = "over_15",
  OVER_19 = "over_19",
}

export const ageToKorean = {
  [Age.ALL]: "전체 이용가",
  [Age.OVER_12]: "12세 이용가",
  [Age.OVER_15]: "15세 이용가",
  [Age.OVER_19]: "19세 이용가",
};

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  age: Age;
  place: string;
  prices: string[];
  tiers: string[];
  time: string;
}

export async function findAll() {
  return await apiInstance().get<Product[]>("/product");
}

export async function findOneById(id: string) {
  return await apiInstance().get<Product>(`/product/${id}`);
}
