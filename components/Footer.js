import { Flex, Text, Link } from "theme-ui";

export default function Footer() {
  return (
    <Flex
      as="footer"
      sx={{
        fontSize: 0,
        py: 4,
        px: [3, 4],
        color: "rgba(248, 251, 255, 0.35)",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        mt: 4,
      }}
    >
      <Text>
        <Link
          href="https://boba.hackclub.com/"
          target="_blank"
          rel="noreferrer"
          sx={{ color: "primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Boba
        </Link>
        {" Workshop Dashboard"}
      </Text>
    </Flex>
  );
}
