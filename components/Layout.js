import Head from "next/head";
import { Box } from "theme-ui";
import { useState } from "react";

const MAINTENANCE_MODE = false;

const MaintenanceScreen = ({ onHide }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#EC3750",
    }}
  >
    <div
      style={{
        textAlign: "center",
        padding: "48px 40px",
        background: "rgba(0,0,0,0.55)",
        borderRadius: 16,
        border: "2px solid rgba(255,255,255,0.15)",
        maxWidth: 480,
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
        Down for Maintenance
      </div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
        The dashboard is currently unavailable. To end your workshop, contact{" "}
        <strong>@Rushmore</strong> on Slack.
      </div>
      <button
        onClick={onHide}
        style={{
          marginTop: 24,
          padding: "8px 20px",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Preview (Dev)
      </button>
    </div>
  </div>
);

const Layout = ({
  children,
  title = "Boba Workshop Dashboard",
  description = "Manage your Hack Club Boba Workshop.",
}) => {
  const [showMaintenance, setShowMaintenance] = useState(MAINTENANCE_MODE);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {MAINTENANCE_MODE && showMaintenance && (
        <MaintenanceScreen onHide={() => setShowMaintenance(false)} />
      )}

      {MAINTENANCE_MODE && !showMaintenance && (
        <button
          onClick={() => setShowMaintenance(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            padding: "6px 14px",
            background: "#EC3750",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Maintenance Mode
        </button>
      )}

      <Box sx={{ minHeight: "100vh", bg: "background", color: "text" }}>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
