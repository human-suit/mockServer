import { useState } from "react";
import { waybillApi } from "../model/Waybill.store";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const WaybillCreateModal = ({ onClose, onCreated }: Props) => {
  const [number, setNumber] = useState("");

  const handleCreate = async () => {
    await waybillApi.create({
      number,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    onCreated();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Create Waybill</h3>

      <input
        placeholder="Waybill number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default WaybillCreateModal;
