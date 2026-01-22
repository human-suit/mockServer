import { useState, useEffect } from "react";
import { Waybill, getWaybills } from "@shared/api/mockWaybills";
import WaybillCreateModal from "./WaybillCreateModal";
import WaybillEditModal from "./WaybillEditModal";
import WaybillDeleteModal from "./WaybillDeleteModal";

const WaybillTable = () => {
  const [data, setData] = useState<Waybill[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Waybill | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = async () => {
    const wb = await getWaybills();
    setData(wb);
  };

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };
    void fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setCreateOpen(true)}>Create</button>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((w) => (
            <tr key={w.id}>
              <td>{w.number}</td>
              <td>{w.sender}</td>
              <td>{w.receiver}</td>
              <td>{w.status}</td>
              <td>
                <button onClick={() => setEditItem(w)}>Edit</button>
                <button onClick={() => setDeleteId(w.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createOpen && (
        <WaybillCreateModal
          onClose={() => setCreateOpen(false)}
          onCreated={load}
        />
      )}
      {editItem && (
        <WaybillEditModal
          waybill={editItem}
          onClose={() => setEditItem(null)}
          onUpdated={load}
        />
      )}
      {deleteId !== null && (
        <WaybillDeleteModal
          id={deleteId}
          onClose={() => setDeleteId(null)}
          onDeleted={load}
        />
      )}
    </div>
  );
};

export default WaybillTable;
