import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

type SearchResultCardProps = {
  number: number;
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

function SearchResultCard({
  number,
  title,
  topic,
  difficulty,
}: SearchResultCardProps) {
  const difficultyColor =
    difficulty === "Easy"
      ? "#16A34A"
      : difficulty === "Medium"
      ? "#F59E0B"
      : "#DC2626";

  const difficultyBg =
    difficulty === "Easy"
      ? "#DCFCE7"
      : difficulty === "Medium"
      ? "#FEF3C7"
      : "#FEE2E2";

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mb: 2,
              }}
            >
              {number}. {title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={topic}
                size="small"
                sx={{
                  bgcolor: "#EEF2FF",
                  color: "#2563EB",
                }}
              />

              <Chip
                label={difficulty}
                size="small"
                sx={{
                  bgcolor: difficultyBg,
                  color: difficultyColor,
                }}
              />
            </Box>
          </Box>

          <IconButton>
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SearchResultCard;