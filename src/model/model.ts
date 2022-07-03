import type { DateTime } from "luxon";

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
export type HomeStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "WAITING"
  | "FINISHED";

export type Home = {
  id: number;
  client: any;
  assigned: any | undefined;
  status: HomeStatus;
  lastModified: DateTime;
};
