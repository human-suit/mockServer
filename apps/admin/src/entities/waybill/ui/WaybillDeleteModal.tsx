import { deleteWaybill } from "@shared/api/mockWaybills";

interface Props {
  id: string;
  onClose: () => void;
  onDeleted: () => Promise<void>;
}

const WaybillDeleteModal = ({ id, onClose, onDeleted }: Props) => {
  const handleDelete = async () => {
    await deleteWaybill(id);
    await onDeleted();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Delete Waybill</h3>
      <p>Are you sure you want to delete this waybill?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default WaybillDeleteModal;
