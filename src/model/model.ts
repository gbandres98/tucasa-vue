import type { DateTime } from "luxon";
import type { WallData } from "@/editor/indoorEditor";
import type { PlacedModel } from "@/editor/furniture";
import type { Area } from "@/editor/grid";
import type { IndoorContainerData } from "@/editor/indoorEditor";

export type Province = {
  code: string;
  label: string;
};

export type City = {
  code: string;
  label: string;
};

export type Terrain = {
  id: string;
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

export type SimpleVector3 = {
  x: number;
  y: number;
  z: number;
};

export type ContainerData = {
  sizeI: number;
  sizeJ: number;
  floor: number;

  area: Area;
};

export type Value = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

export type Option = {
  id: string;
  name: string;
  values: Array<Value>;
  filled: boolean;
};

export type OptionChosen = {
  name: string;
  value: Value | undefined;
};

export type Design = {
  terrain: Terrain;
  containers: Array<IndoorContainerData>;
  walls: Array<WallData>;
  furniture: Array<PlacedModel>;
};

export type PaymentInfo = {
  totalPrice: number;
  payments: number;
};

export type ClientInfo = {
  name: string;
  surname: string;
  phone: string;
  email: string;
};

export type Staff = {
  name: string;
  email: string;
};

export type Project = {
  id: number;
  design: Design;
  payment: PaymentInfo;
  client: ClientInfo;
  assigned: Staff | undefined;
  status: HomeStatus;
  lastModified: DateTime;
  options: Array<OptionChosen>;
};

export type ProjectDTO = {
  id: number;
  design: Design;
  payment: PaymentInfo;
  client: ClientInfo;
  assigned: Staff | undefined;
  status: HomeStatus;
  lastModified: number;
  options: Array<OptionChosen>;
};

export type Message = {
  date: DateTime;
  text: string;
  staff: boolean;
};
