// entities/waybill/seed.ts
import { Waybill } from "./model";

export const waybillSeed: Waybill[] = [
  {
    id: "b6c9c4b6-9a58-4a2e-a7dd-111111111111",
    waybillType: "Электронная",
    waybillNumber: "ЭТРАН-0001",
    waybillIdentifier: "EXT-12345",

    shipmentType: "ЖД",
    shipmentSpeed: "Обычная",
    formType: "Основная",

    waybillCreatedAt: "2025-01-10T10:00:00Z",
    submittedAt: "2025-01-10T11:00:00Z",
    approvedAt: "2025-01-11T09:30:00Z",

    departureCountry: "Россия",
    departureStation: "Алабуга",
    departureStationCode: "123456",

    destinationCountry: "Россия",
    destinationStation: "Москва-Товарная",
    destinationStationCode: "654321",

    shipperName: "ООО Алабуга Девелопмент",
    shipperAddress: "РФ, Татарстан",
    shipperOkpo: "12345678",

    consigneeName: "ООО Логистика",
    consigneeAddress: "г. Москва",
    consigneeOkpo: "87654321",

    payer: "ООО Алабуга Девелопмент",
    paymentForm: "Безналичная",

    wagonOwnershipType: "Собственные",
    plannedWagons: "5",

    responsiblePerson: "Иванов И.И.",

    waybillProducts: [],
    waybillRailwayCarriages: [],
    waybillSpecialMarks: [],
    waybillTariffMarks: [],
  },
];
