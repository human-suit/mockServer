import { Waybill, CreateWaybillDto } from "../types/types";

export const waybillApi = {
  getAll: async (): Promise<Waybill[]> => {
    const res = await fetch("/api/waybills");
    return res.json();
  },

  create: async (data: CreateWaybillDto): Promise<Waybill> => {
    const res = await fetch("/api/waybills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  update: async (
    id: number,
    data: Partial<Pick<Waybill, "number" | "status">>,
  ): Promise<Waybill> => {
    const res = await fetch(`/api/waybills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`/api/waybills/${id}`, { method: "DELETE" });
  },
};
