import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";

type Props = {
  total: number;
  active: number;
  inactive: number;
  topics: number;
  newThisMonth: number;
};

function QuestionStatistics({
  total,
  active,
  inactive,
  topics,
  newThisMonth,
}: Props) {
  const cards = [
    {
      icon: <HelpOutlineOutlinedIcon color="primary" />,
      value: total,
      label: "Total Questions",
    },
    {
      icon: (
        <CheckCircleOutlineOutlinedIcon
          color="success"
        />
      ),
      value: active,
      label: "Active",
    },
    {
      icon: (
        <HighlightOffOutlinedIcon
          color="error"
        />
      ),
      value: inactive,
      label: "Inactive",
    },
    {
      icon: (
        <LocalOfferOutlinedIcon
          color="secondary"
        />
      ),
      value: topics,
      label: "Topics",
    },
    {
      icon: (
        <FiberNewOutlinedIcon
          sx={{ color: "#F59E0B" }}
        />
      ),
      value: newThisMonth,
      label: "New This Month",
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
          size={{
            xs: 12,
            sm: 6,
            md: 2.4,
          }}
          key={card.label}
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

              <Typography
                color="text.secondary"
              >
                {card.label}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default QuestionStatistics;