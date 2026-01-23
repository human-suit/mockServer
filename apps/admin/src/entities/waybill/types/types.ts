export type WaybillStatus = "draft" | "active" | "closed";

export interface Waybill {
  id: string;

  waybillType?: string;
  waybillNumber?: string;
  waybillIdentifier?: string;

  shipmentType?: string;
  shipmentSpeed?: string;
  formType?: string;

  deliveryDeadline?: string;
  waybillCreatedAt?: string;
  submittedAt?: string;
  approvedAt?: string;
  acceptedAt?: string;
  cargoAcceptedAt?: string;
  departureAt?: string;

  departureCountry?: string;
  departureStation?: string;
  departureStationCode?: string;
  destinationCountry?: string;
  destinationStation?: string;
  destinationStationCode?: string;

  shipperName?: string;
  shipperAddress?: string;
  shipperTgnl?: string;
  shipperOkpo?: string;

  consigneeName?: string;
  consigneeAddress?: string;
  consigneeTgnl?: string;
  consigneeOkpo?: string;

  payer?: string;
  payerCode?: string;
  paymentForm?: string;
  paymentPlace?: string;

  wagonOwnershipType?: string;
  plannedWagons?: string;
  responsiblePerson?: string;

  status?: "draft" | "active" | "closed";

  waybillRailwayCarriages?: unknown[];
  waybillProducts?: unknown[];
  waybillSpecialMarks?: unknown[];
  waybillTariffMarks?: unknown[];
}

export interface CreateWaybillDto {
  number: string;
  status?: WaybillStatus;
}
