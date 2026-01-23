import React from "react";
import { Waybill } from "../types/types";

interface Props {
  waybill: Waybill;
  onClose: () => void;
}

const WaybillDetailModal: React.FC<Props> = ({ waybill, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: 24,
          maxHeight: "80vh",
          overflowY: "auto",
          width: 600,
          borderRadius: 8,
        }}
      >
        <h3>Waybill Details</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(waybill).map(([key, value]) => {
            if (Array.isArray(value) || typeof value === "object") return null;
            return (
              <li key={key} style={{ marginBottom: 4 }}>
                <strong>{key}:</strong> {value ?? "—"}
              </li>
            );
          })}
        </ul>
        <button onClick={onClose} style={{ marginTop: 16 }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WaybillDetailModal;
