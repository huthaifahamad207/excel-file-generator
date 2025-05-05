import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { allData = [], columnNames = [] } = location.state || {};
  const [selectedLabels, setSelectedLabels] = useState([]);

  if (!allData || allData.length === 0) {
    return (
      <div style={styles.noDataContainer}>
        <div style={styles.noDataContent}>
          <h2 style={styles.noDataTitle}>No Shipping Data Available</h2>
          <button onClick={() => navigate("/")} style={styles.backButton}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = (printAll = true) => {
    const printContent = printAll
      ? allData
          .map(
            (_, index) => document.getElementById(`label-${index}`).outerHTML
          )
          .join('<div class="page-break"></div>')
      : selectedLabels
          .map((index) => document.getElementById(`label-${index}`).outerHTML)
          .join('<div class="page-break"></div>');

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Labels</title>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white;
            }
            .label-container {
              width: 100%;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              page-break-after: always;
              padding: 20px;
              box-sizing: border-box;
            }
            .page-break {
              page-break-after: always;
            }
            @media print {
              .no-print {
                display: none !important;
              }
              .label-content {
                max-width: 100% !important;
                width: 100% !important;
                margin: 0 !important;
                box-shadow: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const toggleLabelSelection = (index) => {
    setSelectedLabels((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectAllLabels = () => {
    setSelectedLabels(Array.from({ length: allData.length }, (_, i) => i));
  };

  const clearSelection = () => {
    setSelectedLabels([]);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Control Panel */}
      <div style={styles.controlPanel}>
        <div style={styles.controlsLeft}>
          <span style={styles.selectionInfo}>
            {selectedLabels.length} of {allData.length} selected
          </span>
          <button
            onClick={selectAllLabels}
            style={styles.controlButton}
            disabled={selectedLabels.length === allData.length}
          >
            Select All
          </button>
          <button
            onClick={clearSelection}
            style={styles.controlButton}
            disabled={selectedLabels.length === 0}
          >
            Clear
          </button>
        </div>

        <div style={styles.controlsRight}>
          <button
            onClick={() => handlePrint(false)}
            style={{
              ...styles.printButton,
              backgroundColor:
                selectedLabels.length === 0 ? "#808080" : "#217346",
              cursor: selectedLabels.length === 0 ? "not-allowed" : "pointer",
              "&:hover": {
                backgroundColor:
                  selectedLabels.length === 0 ? "#808080" : "#1a5d38",
              },
            }}
            disabled={selectedLabels.length === 0}
          >
            Print Selected
          </button>
          <button onClick={() => handlePrint(true)} style={styles.printButton}>
            Print All
          </button>
          <button onClick={() => navigate("/")} style={styles.backButton}>
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Selection Sidebar */}
        <div style={styles.selectionSidebar}>
          {allData.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.selectionItem,
                backgroundColor: selectedLabels.includes(index)
                  ? "#e1f0e8"
                  : "transparent",
                borderLeft: selectedLabels.includes(index)
                  ? "4px solid #217346"
                  : "4px solid transparent",
              }}
              onClick={() => toggleLabelSelection(index)}
            >
              <div style={styles.selectionCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedLabels.includes(index)}
                  onChange={() => toggleLabelSelection(index)}
                  style={styles.checkboxInput}
                />
              </div>
              <span style={styles.selectionLabel}>Label #{index + 1}</span>
            </div>
          ))}
        </div>

        {/* Labels Container */}
        <div style={styles.labelsContainer}>
          {allData.map((rowData, index) => (
            <div
              key={index}
              id={`label-${index}`}
              style={{
                ...styles.labelWrapper,
                border: selectedLabels.includes(index)
                  ? "2px solid #217346"
                  : "1px solid #e0e0e0",
                boxShadow: selectedLabels.includes(index)
                  ? "0 0 0 4px rgba(33, 115, 70, 0.2)"
                  : "none",
                marginBottom: index < allData.length - 1 ? "30px" : "0",
                minHeight: "fit-content",
              }}
            >
              {/* Label Content */}
              <div style={styles.labelContent}>
                {/* Header Section */}
                <div style={styles.labelHeader}>
                  <div style={styles.headerLeft}>
                    {/* <div style={styles.logo}>
                      <i className="material-icons" style={styles.truckIcon}>
                        local_shipping
                      </i>
                      SHIPPING LABEL
                    </div> */}
                    {/* <div style={styles.labelNumber}>#{index + 1}</div> need to check */}
                  </div>
                  <div style={styles.headerRight}>
                    <div style={styles.labelDate}>
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    {/* <div style={styles.labelStatus}>
                      <i className="material-icons" style={styles.statusIcon}>
                        check_circle
                      </i>
                      READY TO SHIP
                    </div> */}
                  </div>
                </div>

                {/* Main Content - Adjusted for full content display */}
                <div style={styles.contentContainer}>
                  {/* Sender and Receiver Info */}
                  <div style={styles.addressSection}>
                    <div style={styles.senderSection}>
                      <div style={styles.sectionHeader}>
                        {/* <i
                          className="material-icons"
                          style={styles.sectionIcon}
                        >
                          location_on
                        </i> */}
                        SHIP FROM
                      </div>
                      <div style={styles.addressBox}>
                        {columnNames.slice(0, 4).map(
                          (colName, idx) =>
                            rowData[idx] && (
                              <div key={idx} style={styles.addressField}>
                                <span style={styles.fieldLabel}>
                                  {colName}:
                                </span>
                                <span
                                  style={{
                                    ...styles.fieldValue,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {String(rowData[idx])}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>

                    <div style={styles.receiverSection}>
                      <div style={styles.sectionHeader}>
                        {/* <i
                          className="material-icons"
                          style={styles.sectionIcon}
                        >
                          location_on
                        </i> */}
                        SHIP TO
                      </div>
                      <div style={styles.addressBox}>
                        {columnNames.slice(4, 8).map(
                          (colName, idx) =>
                            rowData[idx + 4] && (
                              <div key={idx} style={styles.addressField}>
                                <span style={styles.fieldLabel}>
                                  {colName}:
                                </span>
                                <span
                                  style={{
                                    ...styles.fieldValue,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {String(rowData[idx + 4])}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Barcode and Order Info */}
                  <div style={styles.infoSection}>
                    <div style={styles.barcodeContainer}>
                      <Barcode
                        value={
                          rowData.find(
                            (val) => val && val.toString().trim() !== ""
                          ) || `DEFAULT-${index + 1}`
                        }
                        width={1.5}
                        height={50}
                        fontSize={12}
                        margin={5}
                      />
                    </div>
                    <div
                      style={{ ...styles.orderDetails, overflow: "visible" }}
                    >
                      <div style={styles.sectionHeader}>
                        <i
                          className="material-icons"
                          style={styles.sectionIcon}
                        >
                          receipt
                        </i>
                        ORDER DETAILS
                      </div>
                      <div style={styles.detailsGrid}>
                        {columnNames.slice(8).map(
                          (colName, idx) =>
                            rowData[idx + 8] && (
                              <div key={idx} style={styles.detailItem}>
                                <span style={styles.detailLabel}>
                                  {colName}:
                                </span>
                                <span
                                  style={{
                                    ...styles.detailValue,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {String(rowData[idx + 8])}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    overflow: "hidden",
  },
  controlPanel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  controlsLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  controlsRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  selectionInfo: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "500",
  },
  controlButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#217346",
    border: "1px solid #217346",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#f0f7f4",
    },
    ":disabled": {
      color: "#95a5a6",
      borderColor: "#e0e0e0",
      cursor: "not-allowed",
    },
  },
  printButton: {
    padding: "10px 20px",
    backgroundColor: "#217346",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#1a5d38",
    },
    ":disabled": {
      backgroundColor: "#e0e0e0",
      cursor: "not-allowed",
    },
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#555",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  mainContent: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  selectionSidebar: {
    width: "200px",
    backgroundColor: "white",
    borderRight: "1px solid #e0e0e0",
    overflowY: "auto",
    padding: "20px 0",
  },
  selectionItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#f0f7f4",
    },
  },
  selectionCheckbox: {
    marginRight: "10px",
  },
  checkboxInput: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#217346",
  },
  selectionLabel: {
    fontSize: "14px",
    color: "#333",
  },
  labelsContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
  labelWrapper: {
    backgroundColor: "white",
    borderRadius: "8px",
    transition: "all 0.3s",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    overflow: "visible",
  },
  labelContent: {
    padding: "0",
    overflow: "visible",
  },
  labelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#217346",
    color: "white",
    padding: "15px 20px",
    background: "linear-gradient(135deg, #217346 0%, #1a5d38 100%)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  truckIcon: {
    fontSize: "20px",
  },
  labelNumber: {
    fontSize: "13px",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "4px 8px",
    borderRadius: "12px",
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "5px",
  },
  labelDate: {
    fontSize: "13px",
    fontWeight: "500",
  },
  labelStatus: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "4px 8px",
    borderRadius: "12px",
  },
  statusIcon: {
    fontSize: "14px",
  },
  contentContainer: {
    padding: "20px",
    overflow: "visible",
  },
  addressSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "12px",
    paddingBottom: "6px",
    borderBottom: "1px solid #e0e0e0",
    textTransform: "uppercase",
  },
  sectionIcon: {
    fontSize: "16px",
    color: "#217346",
  },
  addressBox: {
    backgroundColor: "#f8f9fa",
    padding: "16px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    overflow: "visible",
  },
  addressField: {
    marginBottom: "10px",
    display: "flex",
    overflow: "visible",
  },
  fieldLabel: {
    fontSize: "13px",
    color: "#7f8c8d",
    fontWeight: "500",
    marginRight: "10px",
    minWidth: "100px",
  },
  fieldValue: {
    fontSize: "14px",
    fontWeight: "500",
    flex: 1,
  },
  infoSection: {
    display: "flex",
    gap: "20px",
    overflow: "visible",
  },
  barcodeContainer: {
    flex: "0 0 200px",
    display: "flex",
    justifyContent: "center",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
  },
  orderDetails: {
    flex: 1,
    overflow: "visible",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "10px",
    overflow: "visible",
  },
  detailItem: {
    marginBottom: "8px",
    display: "flex",
    overflow: "visible",
  },
  detailLabel: {
    fontSize: "13px",
    color: "#7f8c8d",
    fontWeight: "500",
    marginRight: "10px",
    minWidth: "100px",
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: "500",
    flex: 1,
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  noDataContent: {
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  noDataTitle: {
    fontSize: "24px",
    color: "#e74c3c",
    marginBottom: "20px",
  },
};

export default ReviewPage;
