import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function HomePage() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setError("");
    setData([]);
    setHeaders([]);

    if (!file) return;

    const fileExtension = file.name.split(".").pop();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      setError("الملف يجب أن يكون من نوع Excel (.xlsx أو .xls)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: true,
        defval: "",
      });
      setHeaders(parsedData[0]);
      setData(parsedData.slice(1));
    };
    reader.readAsBinaryString(file);
  };

  const handleGenerateLabels = () => {
    navigate("/review", { state: { allData: data, columnNames: headers } });
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Overlay Effect */}
      {data.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        Excel File Generator
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <label
          htmlFor="upload"
          style={{
            backgroundColor: "#217346",
            color: "white",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#1a5d38",
              transform: "translateY(-2px)",
            },
          }}
        >
          Choose your Excel file
        </label>
        <input
          id="upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          {error}
        </p>
      )}

      {data.length > 0 && (
        <>
          <div
            style={{
              width: "95%",
              maxWidth: "1200px",
              margin: "0 auto",
              marginTop: "30px",
              overflowX: "auto",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "12px 15px",
                        textAlign: "left",
                        backgroundColor: "#217346",
                        color: "white",
                        fontWeight: "bold",
                        position: "sticky",
                        top: 0,
                        minWidth: "100px",
                        borderRight: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#ffffff" : "#f9f9f9",
                      ":hover": {
                        backgroundColor: "#f0f7f4",
                      },
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: "10px 15px",
                          textAlign: "left",
                          verticalAlign: "middle",
                          borderBottom: "1px solid #e0e0e0",
                          borderRight: "1px solid #e0e0e0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "300px",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button
              onClick={handleGenerateLabels}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#217346",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.3s",
                fontWeight: "bold",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                ":hover": {
                  backgroundColor: "#1a5d38",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Generate Shipping Labels
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
