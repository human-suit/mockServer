export type WaybillStatus = "draft" | "active" | "closed";

export interface Waybill {
  id: number;
  number: string;
  status: WaybillStatus;
  createdAt: string;
  updatedAt: string;
}
