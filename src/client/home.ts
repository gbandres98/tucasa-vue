import { DateTime } from "luxon";
import type { Home } from "@/model/model";

export const getHomes = async (): Promise<Array<Home>> => [
  {
    id: 0,
    client: {
      email: "user@gbandres.com",
    },
    assigned: undefined,
    status: "NEW",
    lastModified: DateTime.now().minus({ week: 3 }),
  },
  {
    id: 1,
    client: {
      email: "user@gbandres.com",
    },
    assigned: undefined,
    status: "NEW",
    lastModified: DateTime.now().minus({ week: 3 }),
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
    lastModified: DateTime.now().minus({ week: 3 }),
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
    lastModified: DateTime.now().minus({ week: 3 }),
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
    lastModified: DateTime.now().minus({ week: 3 }),
  },
];
