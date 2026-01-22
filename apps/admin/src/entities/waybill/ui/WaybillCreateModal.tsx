import { useState } from "react";
import { createWaybill, WaybillStatus } from "@shared/api/mockWaybills";

interface Props {
  onClose: () => void;
  onCreated: () => Promise<void>;
}

const WaybillCreateModal = ({ onClose, onCreated }: Props) => {
  const [number, setNumber] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [status, setStatus] = useState<WaybillStatus>("draft");

  const handleCreate = async () => {
    await createWaybill({
      number,
      sender,
      receiver,
      status,
      date: new Date().toISOString().split("T")[0],
    });
    await onCreated();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Create Waybill</h3>
      <input
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        placeholder="Sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as WaybillStatus)}
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>
      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default WaybillCreateModal;
