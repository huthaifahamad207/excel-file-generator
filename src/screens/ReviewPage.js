import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData = [], columnNames = [] } = location.state || {};

  if (!rowData || rowData.length === 0) {
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

  const handlePrint = () => {
    window.print();
  };

  // const barcodeValue =
  //   rowData.filter((val) => val && val.toString().trim() !== "").join("-") ||
  //   "DEFAULT-CODE";

  const barcodeValue =
    rowData.find((val) => val && val.toString().trim() !== "") ||
    "DEFAULT-CODE";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.shippingLabel}>
        {/* Header Section */}
        <div style={styles.labelHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>SHIPPING LABEL</div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.date}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.contentContainer}>
          {/* Sender and Receiver Info */}
          <div style={styles.addressSection}>
            <div style={styles.senderSection}>
              <div style={styles.sectionHeader}>SHIP FROM</div>
              <div style={styles.addressBox}>
                {columnNames.slice(0, 4).map(
                  (colName, index) =>
                    rowData[index] && (
                      <div key={index} style={styles.addressField}>
                        <span style={styles.fieldLabel}>{colName}:</span>
                        <span style={styles.fieldValue} title={rowData[index]}>
                          {rowData[index]}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>

            <div style={styles.receiverSection}>
              <div style={styles.sectionHeader}>SHIP TO</div>
              <div style={styles.addressBox}>
                {columnNames.slice(4, 8).map(
                  (colName, index) =>
                    rowData[index + 4] && (
                      <div key={index} style={styles.addressField}>
                        <span style={styles.fieldLabel}>{colName}:</span>
                        <span
                          style={styles.fieldValue}
                          title={rowData[index + 4]}
                        >
                          {rowData[index + 4]}
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
                value={barcodeValue.toString()}
                width={1.5}
                height={50}
                fontSize={12}
                margin={5}
              />
            </div>
            <div style={styles.orderDetails}>
              <div style={styles.sectionHeader}>ORDER DETAILS</div>
              <div style={styles.detailsGrid}>
                {columnNames.slice(8).map(
                  (colName, index) =>
                    rowData[index + 8] && (
                      <div key={index} style={styles.detailItem}>
                        <span style={styles.detailLabel}>{colName}:</span>
                        <span
                          style={styles.detailValue}
                          title={rowData[index + 8]}
                        >
                          {rowData[index + 8]}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.actionButtons}>
            <button
              onClick={() => navigate("/")}
              style={styles.secondaryButton}
            >
              Back
            </button>
            <button onClick={handlePrint} style={styles.primaryButton}>
              Print Label
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  shippingLabel: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  labelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#217346",
    color: "white",
    padding: "15px 25px",
    borderBottom: "3px solid #1a5d38",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  headerRight: {
    textAlign: "right",
  },
  date: {
    fontSize: "14px",
    fontWeight: "600",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  addressSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  sectionHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
    paddingBottom: "5px",
    borderBottom: "2px solid #e0e0e0",
    textTransform: "uppercase",
  },
  addressBox: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
  },
  addressField: {
    marginBottom: "8px",
    display: "flex",
    minHeight: "20px",
  },
  fieldLabel: {
    fontSize: "12px",
    color: "#7f8c8d",
    fontWeight: "600",
    marginRight: "8px",
    minWidth: "80px",
  },
  fieldValue: {
    fontSize: "13px",
    fontWeight: "500",
    wordBreak: "break-word",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal", //
  },
  infoSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  barcodeContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    maxWidth: "300px",
  },
  orderDetails: {
    flex: 1,
    marginLeft: "20px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "10px",
  },
  detailItem: {
    marginBottom: "8px",
    display: "flex",
  },
  detailLabel: {
    fontSize: "12px",
    color: "#7f8c8d",
    fontWeight: "600",
    marginRight: "8px",
    minWidth: "80px",
    whiteSpace: "normal",
  },
  detailValue: {
    fontSize: "13px",
    fontWeight: "500",
    wordBreak: "break-word",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  footer: {
    padding: "15px 25px",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e0e0e0",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
  },
  primaryButton: {
    padding: "10px 20px",
    backgroundColor: "#217346",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#1a5d38",
    },
  },
  secondaryButton: {
    padding: "10px 20px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#7f8c8d",
    },
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
  backButton: {
    padding: "12px 24px",
    backgroundColor: "#217346",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#1a5d38",
    },
  },
};

export default ReviewPage;
