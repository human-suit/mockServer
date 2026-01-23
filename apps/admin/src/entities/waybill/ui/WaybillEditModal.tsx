import { useState } from "react";
import { updateWaybill } from "@shared/api/mockWaybills";
import type { Waybill, WaybillStatus } from "../types/types";

interface Props {
  waybill: Waybill;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

// Берём все поля, кроме id
type UpdateWaybillDto = Omit<Waybill, "id">;

const WaybillEditModal = ({ waybill, onClose, onUpdated }: Props) => {
  const [form, setForm] = useState<UpdateWaybillDto>({
    ...waybill,
    waybillCreatedAt: waybill.waybillCreatedAt || new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof UpdateWaybillDto>(
    field: K,
    value: UpdateWaybillDto[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateWaybill(waybill.id, form);
      await onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Edit Waybill</h3>

      {/* --- Основное --- */}
      <input
        placeholder="Waybill Number"
        value={form.waybillNumber}
        onChange={(e) => handleChange("waybillNumber", e.target.value)}
      />
      <input
        placeholder="Waybill Type"
        value={form.waybillType}
        onChange={(e) => handleChange("waybillType", e.target.value)}
      />

      {/* --- Отправитель --- */}
      <input
        placeholder="Shipper Name"
        value={form.shipperName}
        onChange={(e) => handleChange("shipperName", e.target.value)}
      />
      <input
        placeholder="Shipper Address"
        value={form.shipperAddress}
        onChange={(e) => handleChange("shipperAddress", e.target.value)}
      />

      {/* --- Получатель --- */}
      <input
        placeholder="Consignee Name"
        value={form.consigneeName}
        onChange={(e) => handleChange("consigneeName", e.target.value)}
      />
      <input
        placeholder="Consignee Address"
        value={form.consigneeAddress}
        onChange={(e) => handleChange("consigneeAddress", e.target.value)}
      />

      {/* --- Маршрут --- */}
      <input
        placeholder="Departure Country"
        value={form.departureCountry}
        onChange={(e) => handleChange("departureCountry", e.target.value)}
      />
      <input
        placeholder="Departure Station"
        value={form.departureStation}
        onChange={(e) => handleChange("departureStation", e.target.value)}
      />
      <input
        placeholder="Destination Country"
        value={form.destinationCountry}
        onChange={(e) => handleChange("destinationCountry", e.target.value)}
      />
      <input
        placeholder="Destination Station"
        value={form.destinationStation}
        onChange={(e) => handleChange("destinationStation", e.target.value)}
      />

      {/* --- Статус --- */}
      <select
        value={form.status}
        onChange={(e) =>
          handleChange("status", e.target.value as WaybillStatus)
        }
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleSave} disabled={loading}>
          Save
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default WaybillEditModal;
