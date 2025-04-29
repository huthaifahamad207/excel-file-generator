import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData, columnNames } = location.state || {};

  if (!rowData) {
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

  const barcodeValue = rowData.join("|") || "DEFAULT-CODE";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.shippingLabel}>
        <div style={styles.labelHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}> SHIPPING</div>
            <div style={styles.shipmentType}>STANDARD SHIPPING</div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.trackingNumber}>
              TRACKING #: {barcodeValue.substring(0, 12)}...
            </div>
            <div style={styles.date}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div style={styles.barcodeSection}>
          <Barcode
            value={barcodeValue}
            width={2}
            height={80}
            fontSize={16}
            margin={10}
            background="transparent"
            lineColor="#2c3e50"
          />
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.senderSection}>
            <div style={styles.sectionHeader}>SHIP FROM</div>
            <div style={styles.addressBox}>
              <div style={styles.addressField}>
                <span style={styles.fieldLabel}>Company:</span>
                <span style={styles.fieldValue}>Your Company Name</span>
              </div>
              <div style={styles.addressField}>
                <span style={styles.fieldLabel}>Address:</span>
                <span style={styles.fieldValue}>
                  123 Business St, Industrial Zone
                </span>
              </div>
              <div style={styles.addressField}>
                <span style={styles.fieldLabel}>City:</span>
                <span style={styles.fieldValue}>Amman</span>
              </div>
              <div style={styles.addressField}>
                <span style={styles.fieldLabel}>Phone:</span>
                <span style={styles.fieldValue}>+962 6 400 1000</span>
              </div>
            </div>
          </div>

          <div style={styles.receiverSection}>
            <div style={styles.sectionHeader}>SHIP TO</div>
            <div style={styles.addressBox}>
              {columnNames.slice(0, 4).map((colName, index) => (
                <div key={index} style={styles.addressField}>
                  <span style={styles.fieldLabel}>{colName}:</span>
                  <span style={styles.fieldValue}>
                    {rowData[index] || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.orderDetails}>
          <div style={styles.sectionHeader}>ORDER DETAILS</div>
          <div style={styles.detailsGrid}>
            {columnNames.slice(4).map((colName, index) => (
              <div key={index} style={styles.detailItem}>
                <span style={styles.detailLabel}>{colName}:</span>
                <span style={styles.detailValue}>
                  {rowData[index + 4] || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          {/* <div style={styles.footerNote}>
            <strong>Note:</strong> This label contains a unique barcode for
            tracking purposes.
          </div> */}
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
  },
  labelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "15px 25px",
    borderBottom: "3px solid #3498db",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginBottom: "5px",
    color: "#3498db",
  },
  shipmentType: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ecf0f1",
    padding: "4px 8px",
    backgroundColor: "#3498db",
    borderRadius: "4px",
    display: "inline-block",
  },
  headerRight: {
    textAlign: "right",
  },
  trackingNumber: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  date: {
    fontSize: "14px",
    fontWeight: "600",
  },
  barcodeSection: {
    padding: "25px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e0e0e0",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    padding: "25px",
  },
  senderSection: {
    gridColumn: "1",
  },
  receiverSection: {
    gridColumn: "2",
  },
  sectionHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "15px",
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
    marginBottom: "10px",
    display: "flex",
  },
  fieldLabel: {
    fontSize: "12px",
    color: "#7f8c8d",
    fontWeight: "600",
    marginRight: "8px",
    minWidth: "100px",
    display: "inline-block",
  },
  fieldValue: {
    fontSize: "14px",
    fontWeight: "bold",
    wordBreak: "break-word",
    flex: 1,
  },
  orderDetails: {
    padding: "0 25px 25px 25px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  detailItem: {
    marginBottom: "10px",
  },
  detailLabel: {
    fontSize: "12px",
    color: "#7f8c8d",
    fontWeight: "600",
    marginRight: "8px",
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  footer: {
    padding: "20px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e0e0e0",
  },
  footerNote: {
    fontSize: "12px",
    color: "#7f8c8d",
    maxWidth: "60%",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
  },
  primaryButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    ":hover": {
      backgroundColor: "#2980b9",
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
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#2980b9",
    },
  },
};

export default ReviewPage;
