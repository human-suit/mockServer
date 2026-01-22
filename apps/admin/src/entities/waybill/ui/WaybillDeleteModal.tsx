import { waybillApi } from "../model/Waybill.store";

interface Props {
  id: number;
  onClose: () => void;
  onDeleted: () => void;
}

const WaybillDeleteModal = ({ id, onClose, onDeleted }: Props) => {
  const handleDelete = async () => {
    await waybillApi.delete(id);
    onDeleted();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Delete Waybill</h3>
      <p>Are you sure?</p>

      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default WaybillDeleteModal;
