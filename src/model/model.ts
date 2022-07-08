import type { DateTime } from "luxon";
import {
  ExecuteCodeAction,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Control } from "@babylonjs/gui";

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

export type SimpleVector3 = {
  x: number;
  y: number;
  z: number;
};

export type ContainerData = {
  sizeI: number;
  sizeJ: number;
  floor: number;

  position: SimpleVector3;
};

export type Value = {
  name: string;
  description: string;
  price: number;
};

export type Option = {
  name: string;
  values: Array<Value>;
};
