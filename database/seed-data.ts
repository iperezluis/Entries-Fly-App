interface SeeData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seeData: SeeData = {
  entries: [
    {
      description: "Entries pending",
      status: "Pending",
      createdAt: Date.now(),
    },
    {
      description: "Entries Progress",
      status: "In-Progress",
      createdAt: Date.now() - 100000,
    },
    {
      description: "Entries Finished",
      status: "Finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};
