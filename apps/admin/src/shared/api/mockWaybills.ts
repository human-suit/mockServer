export interface Waybill {
  id: number;
  number: string;
  date: string;
  sender: string;
  receiver: string;
}

let waybills: Waybill[] = [
  {
    id: 1,
    number: "WB-001",
    date: "2026-01-21",
    sender: "АО РЖД",
    receiver: "ООО Логистик",
  },
  {
    id: 2,
    number: "WB-002",
    date: "2026-01-22",
    sender: "АО РЖД",
    receiver: "ООО Транс",
  },
];

export const getWaybills = async () => {
  return [...waybills];
};

export const createWaybill = async (wb: Omit<Waybill, "id">) => {
  const newWaybill = { ...wb, id: waybills.length + 1 };
  waybills.push(newWaybill);
  return newWaybill;
};

export const updateWaybill = async (id: number, wb: Partial<Waybill>) => {
  waybills = waybills.map((w) => (w.id === id ? { ...w, ...wb } : w));
  return waybills.find((w) => w.id === id);
};

export const deleteWaybill = async (id: number) => {
  waybills = waybills.filter((w) => w.id !== id);
  return true;
};
