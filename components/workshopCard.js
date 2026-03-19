import { Box, Text } from "theme-ui";
import { useRouter } from "next/router";

export default function WorkshopCard(props) {
  const { Eventcode, ClubName, EventStatus, OrganizerName, showOrganizer } = props;
  const router = useRouter();

  const statusColors = {
    Active: "#33D6A6",
    Deactivated: "rgba(255,255,255,0.1)",
  };

  const handleNavigate = () => {
    const target = `/event/${encodeURIComponent(Eventcode || "")}`;
    router.push(target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <Box
      sx={{
        minHeight: 140,
        width: "100%",
        bg: "rgba(20, 25, 40, 0.6)",
        border: "2px solid",
        borderColor: statusColors[EventStatus] || "rgba(255,255,255,0.1)",
        borderRadius: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        cursor: "pointer",
        transition: "border-color 150ms",
        "&:hover": {
          borderColor: statusColors[EventStatus] || "#EC3750",
        },
      }}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View workshop ${ClubName || Eventcode}`}
    >
      <Box>
        <Text
          sx={{
            fontSize: 4,
            fontWeight: "bold",
            color: "text",
            letterSpacing: "-0.02em",
          }}
        >
          {ClubName || Eventcode}
        </Text>
        {ClubName && Eventcode && (
          <Text
            sx={{
              fontSize: 1,
              color: "rgba(248, 251, 255, 0.4)",
              mt: 1,
            }}
          >
            {Eventcode}
          </Text>
        )}
        {showOrganizer && OrganizerName && (
          <Text
            sx={{
              fontSize: 1,
              color: "rgba(248, 251, 255, 0.5)",
              mt: 1,
            }}
          >
            by {OrganizerName}
          </Text>
        )}
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          alignSelf: "flex-start",
          px: 3,
          py: 1,
          bg: statusColors[EventStatus] || "rgba(255,255,255,0.1)",
          color: "#000",
          fontSize: 1,
          fontWeight: "bold",
          borderRadius: 4,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {EventStatus}
      </Box>
    </Box>
  );
}
