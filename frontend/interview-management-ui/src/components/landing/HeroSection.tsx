import { Box, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        background: "#F8FAFC",

        textAlign: "center",

        pt: "70px",
        pb: "45px",
      }}
    >
      {/* Left dots */}

      <Box
        sx={{
          position: "absolute",

          top: 45,
          left: 30,

          width: 110,
          height: 110,

          backgroundImage:
            "radial-gradient(#2563EB 1.5px, transparent 1.5px)",

          backgroundSize: "14px 14px",

          opacity: .15,
        }}
      />

      {/* Left Circle */}

      <Box
        sx={{
          position: "absolute",

          top: 150,
          left: 20,

          width: 75,
          height: 75,

          borderRadius: "50%",

          bgcolor: "rgba(37,99,235,.10)",
        }}
      />

      {/* Left Dot */}

      <Box
        sx={{
          position: "absolute",

          top: 300,
          left: 155,

          width: 15,
          height: 15,

          borderRadius: "50%",

          bgcolor: "rgba(37,99,235,.45)",
        }}
      />

      {/* Purple Dot */}

      <Box
        sx={{
          position: "absolute",

          top: 250,
          right: 90,

          width: 22,
          height: 22,

          borderRadius: "50%",

          bgcolor: "rgba(168,85,247,.28)",
        }}
      />

      {/* Curves */}

      <Box
        sx={{
          position: "absolute",

          top: -180,
          right: -220,

          width: 520,
          height: 520,

          borderRadius: "50%",

          background:
            "repeating-radial-gradient(circle,transparent 0px,transparent 10px,rgba(37,99,235,.04) 11px,rgba(37,99,235,.04) 12px)",

          opacity: .6,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: {
              xs: "50px",
              md: "64px",
            },
            lineHeight: 1.08,
            letterSpacing: "-1.8px",
            color: "#111827",
          }}
        >
          Ace Every Interview
        </Typography>

        <Typography
          sx={{
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: {
              xs: "50px",
              md: "64px",
            },
            lineHeight: 1.08,
            letterSpacing: "-1.8px",
          }}
        >
          <Box component="span" sx={{ color: "#2563EB" }}>
            AI-Powered
          </Box>{" "}
          <Box component="span" sx={{ color: "#111827" }}>
            Practice
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 4,

            fontSize: 18,

            color: "#667085",

            lineHeight: 1.7,
          }}
        >
          Practice smarter, get personalized feedback,
          <br />
          and build the confidence to crack any interview.
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroSection;