import type { DateTime } from "luxon";
import type { HomeStatus } from "@/client/home";

export type Province = {
  code: string;
  label: string;
};

export type City = {
  code: string;
  label: string;
};

export type Terrain = {
  sizeX: number;
  sizeY: number;
  price: number;
  address: string;
  postalCode: string;
  province: Province;
  city: City;
  custom: boolean;
  imgUrl: string | undefined;
};

export type Home = {
  id: number;
  client: any;
  assigned: any | undefined;
  status: HomeStatus;
  lastModified: DateTime;
};
