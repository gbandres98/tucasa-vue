export const getHomes = async () => [
    {
        id: 0,
        client: {
            email: "user@gbandres.com",
        },
        assigned: undefined,
        status: "NEW",
    },
    {
        id: 1,
        client: {
            email: "user@gbandres.com",
        },
        assigned: undefined,
        status: "NEW",
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
    },
];
//# sourceMappingURL=home.js.map