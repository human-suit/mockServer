import { Waybill } from "./types";

let waybills: Waybill[] = [
  {
    id: 1,
    number: "WB-001",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    number: "WB-002",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const waybillApi = {
  getAll: async (): Promise<Waybill[]> => {
    return Promise.resolve(waybills);
  },

  create: async (data: Omit<Waybill, "id">): Promise<Waybill> => {
    const newItem: Waybill = {
      ...data,
      id: Date.now(),
    };
    waybills.push(newItem);
    return Promise.resolve(newItem);
  },

  update: async (id: number, data: Partial<Waybill>): Promise<Waybill> => {
    waybills = waybills.map((w) =>
      w.id === id ? { ...w, ...data, updatedAt: new Date().toISOString() } : w,
    );
    return Promise.resolve(waybills.find((w) => w.id === id)!);
  },

  delete: async (id: number): Promise<void> => {
    waybills = waybills.filter((w) => w.id !== id);
    return Promise.resolve();
  },
};
