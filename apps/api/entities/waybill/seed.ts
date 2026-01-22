import { Waybill } from "./model";

export const waybillSeed: Waybill[] = [
  {
    id: 1,
    number: "WB-001",
    date: "2026-01-21",
    sender: "АО РЖД",
    receiver: "ООО Логистик",
    status: "draft",
  },
  {
    id: 2,
    number: "WB-002",
    date: "2026-01-22",
    sender: "АО РЖД",
    receiver: "ООО Транс",
    status: "active",
  },
];
