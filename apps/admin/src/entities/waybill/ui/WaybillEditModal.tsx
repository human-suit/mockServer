import { useState } from "react";
import { Waybill, WaybillStatus } from "../model/types";
import { waybillApi } from "../model/Waybill.store";

interface Props {
  waybill: Waybill;
  onClose: () => void;
  onUpdated: () => void;
}

const WaybillEditModal = ({ waybill, onClose, onUpdated }: Props) => {
  const [number, setNumber] = useState(waybill.number);
  const [status, setStatus] = useState(waybill.status);

  const handleSave = async () => {
    await waybillApi.update(waybill.id, { number, status });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Edit Waybill</h3>

      <input value={number} onChange={(e) => setNumber(e.target.value)} />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as WaybillStatus)}
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default WaybillEditModal;
