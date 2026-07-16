import {
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

const topics = [
  "Arrays",
  "Data Structures",
  "Core Java",
  "Collections",
  "Problem Solving",
  "Interview Preparation",
];

function RelatedTopics() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          mb: 2,
        }}
      >
        Related Topics
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {topics.map((topic) => (
          <Chip
            key={topic}
            label={topic}
            sx={{
              bgcolor: "#F8FAFC",
              border: "1px solid #E5E7EB",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default RelatedTopics;