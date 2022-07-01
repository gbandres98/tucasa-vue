import moment from "moment";
export const getHomes = async () => [
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
//# sourceMappingURL=home.js.map