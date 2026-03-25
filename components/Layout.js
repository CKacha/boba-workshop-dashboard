import Head from "next/head";
import { Box, Container, Flex, Link, Text, Button, Heading } from "theme-ui";
import { useSession, signIn, signOut } from "next-auth/react";

const navLinks = [
  { href: "#ops", label: "Operations" },
  { href: "#pipelines", label: "Pipelines" },
  { href: "#resources", label: "Resources" },
];

const MAINTENANCE_MODE = true;

const stripeStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#EC3750",
  overflow: "hidden",
};

const stripeOverlay = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 30px, transparent 30px, transparent 60px)",
  backgroundSize: "85px 85px",
  pointerEvents: "none",
};

const borderStripe = {
  position: "absolute",
  backgroundImage:
    "repeating-linear-gradient(45deg, #000 0px, #000 20px, #fff 20px, #fff 40px)",
  backgroundSize: "57px 57px",
};

const MaintenanceScreen = () => (
  <div style={stripeStyle}>
    <div style={stripeOverlay} />
    {/* Top border */}
    <div style={{ ...borderStripe, top: 0, left: 0, right: 0, height: 28 }} />
    {/* Bottom border */}
    <div style={{ ...borderStripe, bottom: 0, left: 0, right: 0, height: 28 }} />
    {/* Left border */}
    <div style={{ ...borderStripe, top: 0, bottom: 0, left: 0, width: 28 }} />
    {/* Right border */}
    <div style={{ ...borderStripe, top: 0, bottom: 0, right: 0, width: 28 }} />

    <div
      style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "48px 40px",
        background: "rgba(0,0,0,0.55)",
        borderRadius: 16,
        border: "3px solid rgba(255,255,255,0.15)",
        maxWidth: 540,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 12 }}>🚧</div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.02em",
          marginBottom: 12,
          fontFamily: "system-ui, sans-serif",
          textTransform: "uppercase",
        }}
      >
        Maintenance Mode
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.8)",
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.6,
        }}
      >
        The dashboard is currently down for maintenance.
        <br />
        To end your workshop, contact{" "}
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            background: "rgba(255,255,255,0.15)",
            padding: "2px 8px",
            borderRadius: 6,
          }}
        >
          @Rushmore
        </span>{" "}
        on Slack.
      </div>
    </div>
  </div>
);

const Layout = ({
  children,
  title = "Boba Workshop Dashboard",
  description = "An Airtable-powered dashboard to manage Hack Club Boba Workshops.",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {MAINTENANCE_MODE && <MaintenanceScreen />}

      <Box
        sx={{
          minHeight: "100vh",
          bg: "background",
          color: "text",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            background: "backdrop",
            backdropFilter: "blur(48px)",
            zIndex: -3,
          }}
        />
        <main>{children}</main>{" "}
      </Box>
    </>
  );
};

export default Layout;
