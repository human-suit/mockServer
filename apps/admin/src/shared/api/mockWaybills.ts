// @shared/api/mockWaybills.ts
export type WaybillStatus = "draft" | "active" | "closed";

import { Waybill } from "@entities/waybill/types/types";

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
  id: string, // строка
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
export const deleteWaybill = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/waybills/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204)
    throw new Error("Failed to delete waybill");
};
