import { useState, useEffect, useCallback } from "react";
import { getWaybills } from "@shared/api/mockWaybills";
import { Waybill } from "../types/types";
import WaybillCreateModal from "./WaybillCreateModal";
import WaybillEditModal from "./WaybillEditModal";
import WaybillDeleteModal from "./WaybillDeleteModal";
import WaybillDetailModal from "./WaybillDetailModal";

const WaybillTable = () => {
  const [data, setData] = useState<Waybill[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Waybill | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<Waybill | null>(null);

  const load = useCallback(async () => {
    const wb = await getWaybills();
    setData(wb.map((w) => ({ ...w, id: String(w.id) })));
  }, []);

  // Безопасный useEffect
  useEffect(() => {
    const fetch = async () => {
      await load();
    };
    fetch();
  }, [load]);

  const ActionButtons = ({ item }: { item: Waybill }) => (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => setDetailItem(item)}>View</button>
      <button onClick={() => setEditItem(item)}>Edit</button>
      <button onClick={() => setDeleteId(item.id)}>Delete</button>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Waybills</h2>
        <button onClick={() => setCreateOpen(true)}>Create</button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "8px 12px" }}>Number</th>
              <th style={{ padding: "8px 12px" }}>Shipper</th>
              <th style={{ padding: "8px 12px" }}>Consignee</th>
              <th style={{ padding: "8px 12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((w) => (
              <tr key={w.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 12px" }}>{w.waybillNumber}</td>
                <td style={{ padding: "8px 12px" }}>{w.shipperName}</td>
                <td style={{ padding: "8px 12px" }}>{w.consigneeName}</td>
                <td style={{ padding: "8px 12px" }}>
                  <ActionButtons item={w} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      {detailItem && (
        <WaybillDetailModal
          waybill={detailItem}
          onClose={() => setDetailItem(null)}
        />
      )}
    </div>
  );
};

export default WaybillTable;
