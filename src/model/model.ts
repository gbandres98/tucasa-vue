import type { DateTime } from "luxon";
import {
  ExecuteCodeAction,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
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

  area: Area;
};

export type Value = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

export type Option = {
  name: string;
  values: Array<Value>;
  filled: boolean;
};

export type Design = {
  terrain: Terrain;
  containers: Array<IndoorContainerData>;
  walls: Array<WallData>;
  furniture: Array<PlacedModel>;
};
