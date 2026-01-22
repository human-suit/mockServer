import { Waybill } from "../types/types";

const API_URL = "http://localhost:3001/waybills";

export const getWaybills = async (): Promise<Waybill[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createWaybill = async (
  payload: Omit<Waybill, "id" | "createdAt">,
): Promise<Waybill> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateWaybill = async (
  id: number,
  payload: Omit<Waybill, "id" | "createdAt">,
): Promise<Waybill> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const deleteWaybill = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
