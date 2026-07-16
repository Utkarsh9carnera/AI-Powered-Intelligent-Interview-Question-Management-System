import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Typography } from "@mui/material";

function AuthorizedCard() {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
    width: "100%",
    maxWidth: 720,

    mx: "auto",
    mt: 6,
    mb: 2,

    px: 3,
    py: 2,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,

    bgcolor: "#fff",

    border: "1px solid #E5E7EB",
    borderRadius: "16px",

    transition:
      "transform .18s ease, box-shadow .18s ease, border-color .18s ease",

    "&:hover": {
      borderColor: "#2563EB",
      boxShadow: "0 8px 20px rgba(37,99,235,.08)",
    },
}}
      >
        <LockOutlinedIcon
          sx={{
            color: "#2563EB",
            fontSize: 24,
            mr: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: 17,
            color: "#6B7280",
          }}
        >
          Only authorized users with{" "}
          <Box
            component="span"
            sx={{
              color: "#2563EB",
              fontWeight: 700,
            }}
          >
            @getcarnera.com
          </Box>{" "}
          can access the application.
        </Typography>
      </Box>
    </Box>
  );
}

export default AuthorizedCard;