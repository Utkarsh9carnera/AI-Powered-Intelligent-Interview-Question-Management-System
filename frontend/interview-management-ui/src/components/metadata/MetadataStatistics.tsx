import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";

type Props = {
  total: number;
  types: number;
  withDescription: number;
  newThisMonth: number;
};

function MetadataStatistics({
  total,
  types,
  withDescription,
  newThisMonth,
}: Props) {
  const cards = [
    {
      icon: (
        <CategoryOutlinedIcon color="primary" />
      ),
      value: total,
      label: "Total Metadata",
    },
    {
      icon: (
        <LabelOutlinedIcon color="secondary" />
      ),
      value: types,
      label: "Metadata Types",
    },
    {
      icon: (
        <DescriptionOutlinedIcon color="success" />
      ),
      value: withDescription,
      label: "With Description",
    },
    {
      icon: (
        <FiberNewOutlinedIcon
          sx={{
            color: "#F59E0B",
          }}
        />
      ),
      value: newThisMonth,
      label: "New Entries",
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Grid
          key={card.label}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Stack
              sx={{
                gap: 1,
                alignItems: "center",
              }}
            >
              {card.icon}

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {card.value}
              </Typography>

              <Typography color="text.secondary">
                {card.label}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default MetadataStatistics;