import { useState } from "react";
import {
  Waybill,
  WaybillStatus,
  updateWaybill,
} from "@shared/api/mockWaybills";

interface Props {
  waybill: Waybill;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

const WaybillEditModal = ({ waybill, onClose, onUpdated }: Props) => {
  const [number, setNumber] = useState(waybill.number);
  const [sender, setSender] = useState(waybill.sender);
  const [receiver, setReceiver] = useState(waybill.receiver);
  const [status, setStatus] = useState<WaybillStatus>(waybill.status);

  const handleSave = async () => {
    await updateWaybill(waybill.id, { number, sender, receiver, status });
    await onUpdated();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Edit Waybill</h3>
      <input value={number} onChange={(e) => setNumber(e.target.value)} />
      <input value={sender} onChange={(e) => setSender(e.target.value)} />
      <input value={receiver} onChange={(e) => setReceiver(e.target.value)} />
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
