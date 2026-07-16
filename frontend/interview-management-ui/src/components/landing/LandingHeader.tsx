import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GoogleLoginButton from "../auth/GoogleLoginButton";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

function LandingHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#111827",
        boxShadow: "none",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "1550px",
          mx: "auto",
          px: "20px !important",
          minHeight: "84px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <AutoStoriesIcon
            sx={{
              color: "#2563EB",
              fontSize: 40,
            }}
          />

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            AI Interview
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box>
  <GoogleLoginButton />
</Box>
      </Toolbar>
    </AppBar>
  );
}

export default LandingHeader;