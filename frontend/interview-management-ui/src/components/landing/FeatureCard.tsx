import { Box, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        height: 135,

        display: "flex",
        alignItems: "flex-start",
        gap: 2.5,

        px: 3,
        py: 2.5,

        bgcolor: "#fff",

        border: "1px solid #E5E7EB",
        borderRadius: "18px",

        cursor: "pointer",

        transition:
          "transform .18s ease, box-shadow .18s ease, border-color .18s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#2563EB",
          boxShadow: "0 10px 22px rgba(37,99,235,.10)",
        },
      }}
    >
      <Box
        sx={{
          color: "#2563EB",
          mt: 0.4,
          flexShrink: 0,

          "& svg": {
            fontSize: 46,
          },
        }}
      >
        {icon}
      </Box>

      <Box
  sx={{
    flex: 1,
  }}
>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#101828",
            lineHeight: 1.3,
            mb: 0.8,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: ".98rem",
            color: "#667085",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default FeatureCard;