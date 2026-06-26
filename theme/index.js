import hackClubTheme from "@hackclub/theme";

const theme = {
  ...hackClubTheme,
  config: {
    useColorSchemeMediaQuery: false,
    useLocalStorage: true,
  },
  colors: {
    ...hackClubTheme.colors,
    background: "#030712",
    text: "#F8FBFF",
    primary: "#EC3750",
    secondary: "#33D6A6",
    accent: "#5BC0EB",
    muted: "#111527",
    elevated: "#0A0F1C",
    border: "rgba(248, 251, 255, 0.1)",
    highlight: "#FFC857",
  },
  fonts: {
    ...hackClubTheme.fonts,
    heading:
      "'Space Grotesk', system-ui, -apple-system, sans-serif",
    body: "'Space Grotesk', system-ui, -apple-system, sans-serif",
    mono: "'Space Mono', 'SFMono-Regular', Menlo, monospace",
  },
  radii: {
    ...hackClubTheme.radii,
    soft: 12,
    pill: 999,
  },
  buttons: {
    primary: {
      bg: "primary",
      color: "white",
      borderRadius: 8,
      px: 4,
      py: 2,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      "&:hover": { opacity: 0.9 },
    },
    secondary: {
      bg: "transparent",
      color: "text",
      borderRadius: 8,
      px: 4,
      py: 2,
      fontWeight: 600,
      cursor: "pointer",
      border: "1px solid",
      borderColor: "border",
      "&:hover": { bg: "rgba(255,255,255,0.05)" },
    },
  },
  styles: {
    ...hackClubTheme.styles,
    root: {
      fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
      backgroundColor: "background",
      color: "text",
    },
  },
};

export default theme;
