import type { User } from "firebase/auth";
import type { Moment } from "moment";
import moment from "moment";

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
  lastModified: Moment;
};

export const getHomes = async (): Promise<Array<Home>> => [
  {
    id: 0,
    client: {
      email: "user@gbandres.com",
    },
    assigned: undefined,
    status: "NEW",
    lastModified: moment().subtract(3, "days"),
  },
  {
    id: 1,
    client: {
      email: "user@gbandres.com",
    },
    assigned: undefined,
    status: "NEW",
    lastModified: moment().subtract(3, "days"),
  },
  {
    id: 2,
    client: {
      email: "user@gbandres.com",
    },
    assigned: {
      email: "staff@gbandres.com",
    },
    status: "ASSIGNED",
    lastModified: moment().subtract(3, "days"),
  },
  {
    id: 3,
    client: {
      email: "user@gbandres.com",
    },
    assigned: {
      email: "staff.gbandres.com",
    },
    status: "IN_PROGRESS",
    lastModified: moment().subtract(3, "days"),
  },
  {
    id: 4,
    client: {
      email: "user@gbandres.com",
    },
    assigned: {
      email: "staff.gbandres.com",
    },
    status: "WAITING",
    lastModified: moment().subtract(3, "days"),
  },
];
