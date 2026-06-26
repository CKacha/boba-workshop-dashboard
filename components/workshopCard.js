import { Box, Text } from "theme-ui";
import { useRouter } from "next/router";

const STATUS_STYLES = {
  Active: { bg: "#33D6A6", color: "#000" },
  Deactivated: { bg: "rgba(255,255,255,0.1)", color: "rgba(248,251,255,0.6)" },
};

export default function WorkshopCard({ ClubName, EventStatus, OrganizerName, showOrganizer }) {
  const router = useRouter();
  const status = STATUS_STYLES[EventStatus] || STATUS_STYLES.Deactivated;

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={`View workshop ${ClubName}`}
      onClick={() => router.push(`/event/${encodeURIComponent(ClubName || "")}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/event/${encodeURIComponent(ClubName || "")}`);
        }
      }}
      sx={{
        minHeight: 120,
        width: "100%",
        bg: "rgba(255,255,255,0.03)",
        border: "1px solid",
        borderColor: "border",
        borderRadius: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
        cursor: "pointer",
        transition: "border-color 150ms, background 150ms",
        "&:hover": {
          borderColor: "primary",
          bg: "rgba(255,255,255,0.05)",
        },
      }}
    >
      <Box>
        <Text
          sx={{ fontSize: 3, fontWeight: 700, color: "text", letterSpacing: "-0.01em" }}
        >
          {ClubName}
        </Text>
        {showOrganizer && OrganizerName && (
          <Text sx={{ fontSize: 1, color: "rgba(248,251,255,0.45)", display: "block", mt: 2 }}>
            {OrganizerName}
          </Text>
        )}
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          alignSelf: "flex-start",
          px: 2,
          py: "3px",
          bg: status.bg,
          color: status.color,
          fontSize: 0,
          fontWeight: 700,
          borderRadius: 4,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {EventStatus}
      </Box>
    </Box>
  );
}
