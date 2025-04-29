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

  const handleReview = (row) => {
    navigate("/review", { state: { rowData: row, columnNames: headers } });
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
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
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#45a049",
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
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: "30px",
            overflowX: "auto",
          }}
        >
          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      padding: "8px 12px",
                      textAlign: "center",
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      borderBottom: "2px solid #ccc",
                    }}
                  >
                    {header}
                  </th>
                ))}
                <th style={{ backgroundColor: "#f2f2f2" }}>Review</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        padding: "6px 10px",
                        textAlign: "left",
                        verticalAlign: "middle",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                  <td
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <button
                      onClick={() => handleReview(row)}
                      style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        backgroundColor: "#2980b9",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HomePage;
