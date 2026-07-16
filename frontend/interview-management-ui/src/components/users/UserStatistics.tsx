import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

interface Props {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
}

const UserStatistics = ({
  total,
  active,
  inactive,
  newThisMonth,
}: Props) => {
  const cards = [
    {
      title: "Total Question Managers",
      value: total,
      icon: <PeopleOutlineRoundedIcon color="primary" />,
    },
    {
      title: "Active",
      value: active,
      icon: <CheckCircleOutlineRoundedIcon color="success" />,
    },
    {
      title: "Inactive",
      value: inactive,
      icon: <HighlightOffRoundedIcon color="error" />,
    },
    {
      title: "New This Month",
      value: newThisMonth,
      icon: <PersonAddAltRoundedIcon color="secondary" />,
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ mb: 4 }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            flex: 1,
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <CardContent>
            <Stack
              sx={{ direction: "row", spacing: 2, alignItems: "center" }}
            >
              {card.icon}

              <Stack>
                <Typography
                  sx={{ variant: "h5", fontWeight: 700 }}
                >
                  {card.value}
                </Typography>

                <Typography
                  sx={{ variant: "body2", color: "text.secondary" }}
                >
                  {card.title}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default UserStatistics;