import { Box, Button, Text, Heading } from "theme-ui";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        bg: "background",
      }}
    >
      <Box
        sx={{
          width: ["90%", "400px"],
          p: 5,
          bg: "rgba(255,255,255,0.04)",
          border: "1px solid",
          borderColor: "border",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Heading as="h1" sx={{ fontSize: 4, color: "primary", mb: 1 }}>
          Boba Workshop Dashboard
        </Heading>
        <Text sx={{ fontSize: 1, color: "rgba(248,251,255,0.5)", mb: 2 }}>
          Sign in to manage your Hack Club Boba workshop.
        </Text>

        <Button
          onClick={() => signIn("hackclub", { callbackUrl: "/" })}
          sx={{
            bg: "primary",
            color: "white",
            fontWeight: 700,
            borderRadius: 8,
            py: 3,
            cursor: "pointer",
            border: "none",
            fontSize: 2,
          }}
        >
          Sign in with Hack Club
        </Button>
      </Box>
    </Box>
  );
}
