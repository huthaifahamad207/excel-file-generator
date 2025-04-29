import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode"; // استيراد مكتبة الباركود

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData, columnNames } = location.state || {};

  if (!rowData) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8f8f8",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          No Data Available
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // دمج جميع البيانات في صف واحد (باستثناء العناوين)
  const barcodeValue = rowData.join("-"); // دمج كل القيم في السطر بفاصل "-"

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {/* العنوان في المنتصف */}
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        Data Review
      </h1>

      {/* عرض البيانات بشكل مرتب: كل اثنين بجانب بعض */}
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {columnNames.map((colName, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              backgroundColor: "#ecf0f1",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <strong style={{ fontSize: "16px", color: "#34495e" }}>
              {colName}:
            </strong>
            <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
              {rowData[index] || "Empty"}
            </p>
          </div>
        ))}

        <div
          style={{
            padding: "15px",
            backgroundColor: "#ecf0f1",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            gridColumn: "span 2", //
            textAlign: "center",
          }}
        >
          <strong style={{ fontSize: "16px", color: "#34495e" }}>
            Barcode:
          </strong>
          <div style={{ marginTop: "20px" }}>
            <Barcode
              value={barcodeValue || "No Data"}
              width={0.2} //
              height={50} //
              fontSize={4} //
              margin={0} //
            />
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        style={{
          display: "block",
          margin: "30px auto",
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease",
        }}
      >
        Print
      </button>
    </div>
  );
}

export default ReviewPage;
