export type WaybillStatus = "draft" | "active" | "closed";

export interface Waybill {
  id: number;
  number: string;
  status: WaybillStatus;
  sender: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWaybillDto {
  number: string;
  status?: WaybillStatus;
}
