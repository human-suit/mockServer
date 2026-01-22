export type WaybillStatus = "draft" | "active" | "closed";

export interface Waybill {
  id: number;
  number: string;
  date: string;
  sender: string;
  receiver: string;
  status: WaybillStatus;
}
