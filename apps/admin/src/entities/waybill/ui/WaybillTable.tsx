import { useEffect, useState } from "react";
import { Waybill } from "../model/types";
import { waybillApi } from "../model/Waybill.store";
import WaybillCreateModal from "./WaybillCreateModal";
import WaybillEditModal from "./WaybillEditModal";
import WaybillDeleteModal from "./WaybillDeleteModal";

const WaybillTable = () => {
  const [data, setData] = useState<Waybill[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Waybill | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => waybillApi.getAll().then(setData);

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <button onClick={() => setCreateOpen(true)}>Create</button>

      <table>
        <tbody>
          {data.map((w) => (
            <tr key={w.id}>
              <td>{w.number}</td>
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

      {deleteId && (
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
