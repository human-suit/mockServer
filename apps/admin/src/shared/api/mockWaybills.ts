// @shared/api/mockWaybills.ts
export type WaybillStatus = "draft" | "active" | "closed";

export interface Waybill {
  id: number;
  number: string;
  date: string;
  sender: string;
  receiver: string;
  status: WaybillStatus;
}

const API_BASE = "http://localhost:3000";

// --- Получить все накладные ---
export const getWaybills = async (): Promise<Waybill[]> => {
  const res = await fetch(`${API_BASE}/waybills`);
  if (!res.ok) throw new Error("Failed to fetch waybills");
  return res.json();
};

// --- Создать накладную ---
export const createWaybill = async (
  wb: Omit<Waybill, "id">,
): Promise<Waybill> => {
  const res = await fetch(`${API_BASE}/waybills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wb),
  });
  if (!res.ok) throw new Error("Failed to create waybill");
  return res.json();
};

// --- Обновить накладную ---
export const updateWaybill = async (
  id: number,
  wb: Partial<Omit<Waybill, "id">>,
): Promise<Waybill> => {
  const res = await fetch(`${API_BASE}/waybills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wb),
  });
  if (!res.ok) throw new Error("Failed to update waybill");
  return res.json();
};

// --- Удалить накладную ---
export const deleteWaybill = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE}/waybills/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204)
    throw new Error("Failed to delete waybill");
};
