import { Box, Typography } from "@mui/material";

function LandingFooter() {
  return (
    <Box
      sx={{
        mt: 5,
        mb: 2,

        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: "#98A2B3",
          fontSize: 15,
        }}
      >
        © 2026 Carnera. All rights reserved.
      </Typography>
    </Box>
  );
}

export default LandingFooter;