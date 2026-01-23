import { useState } from "react";
import { createWaybill } from "@shared/api/mockWaybills";
import type { Waybill, WaybillStatus } from "../types/types";

interface Props {
  onClose: () => void;
  onCreated: () => Promise<void>;
}

type CreateWaybillDto = Omit<Waybill, "id">;

const initialWaybill: CreateWaybillDto = {
  waybillType: "",
  waybillNumber: "",
  waybillIdentifier: "",

  shipmentType: "",
  shipmentSpeed: "",
  formType: "",

  deliveryDeadline: "",
  waybillCreatedAt: "",
  submittedAt: "",
  approvedAt: "",
  acceptedAt: "",
  cargoAcceptedAt: "",
  departureAt: "",

  departureCountry: "",
  departureStation: "",
  departureStationCode: "",
  destinationCountry: "",
  destinationStation: "",
  destinationStationCode: "",

  shipperName: "",
  shipperAddress: "",
  shipperTgnl: "",
  shipperOkpo: "",

  consigneeName: "",
  consigneeAddress: "",
  consigneeTgnl: "",
  consigneeOkpo: "",

  payer: "",
  payerCode: "",
  paymentForm: "",
  paymentPlace: "",

  wagonOwnershipType: "",
  plannedWagons: "",
  responsiblePerson: "",

  status: "draft",

  waybillRailwayCarriages: [],
  waybillProducts: [],
  waybillSpecialMarks: [],
  waybillTariffMarks: [],
};

const WaybillCreateModal = ({ onClose, onCreated }: Props) => {
  const [waybill, setWaybill] = useState<CreateWaybillDto>(initialWaybill);

  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof CreateWaybillDto>(
    field: K,
    value: CreateWaybillDto[K],
  ) => {
    setWaybill((prev: CreateWaybillDto) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      await createWaybill({
        ...waybill,
        waybillCreatedAt: new Date().toISOString(),
      });

      await onCreated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Create Waybill</h3>

      {/* --- Основное --- */}
      <input
        placeholder="Waybill Number"
        value={waybill.waybillNumber}
        onChange={(e) => handleChange("waybillNumber", e.target.value)}
      />

      <input
        placeholder="Waybill Type"
        value={waybill.waybillType}
        onChange={(e) => handleChange("waybillType", e.target.value)}
      />

      {/* --- Отправитель --- */}
      <input
        placeholder="Shipper Name"
        value={waybill.shipperName}
        onChange={(e) => handleChange("shipperName", e.target.value)}
      />

      <input
        placeholder="Shipper Address"
        value={waybill.shipperAddress}
        onChange={(e) => handleChange("shipperAddress", e.target.value)}
      />

      {/* --- Получатель --- */}
      <input
        placeholder="Consignee Name"
        value={waybill.consigneeName}
        onChange={(e) => handleChange("consigneeName", e.target.value)}
      />

      <input
        placeholder="Consignee Address"
        value={waybill.consigneeAddress}
        onChange={(e) => handleChange("consigneeAddress", e.target.value)}
      />

      {/* --- Маршрут --- */}
      <input
        placeholder="Departure Country"
        value={waybill.departureCountry}
        onChange={(e) => handleChange("departureCountry", e.target.value)}
      />

      <input
        placeholder="Departure Station"
        value={waybill.departureStation}
        onChange={(e) => handleChange("departureStation", e.target.value)}
      />

      <input
        placeholder="Destination Country"
        value={waybill.destinationCountry}
        onChange={(e) => handleChange("destinationCountry", e.target.value)}
      />

      <input
        placeholder="Destination Station"
        value={waybill.destinationStation}
        onChange={(e) => handleChange("destinationStation", e.target.value)}
      />

      {/* --- Статус --- */}
      <select
        value={waybill.status}
        onChange={(e) =>
          handleChange("status", e.target.value as WaybillStatus)
        }
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleCreate} disabled={loading}>
          Create
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default WaybillCreateModal;
