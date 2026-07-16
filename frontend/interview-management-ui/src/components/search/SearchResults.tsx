import {
  Box,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useSearchParams } from "react-router-dom";

import SearchResultCard from "./SearchResultCard";

const questions = [
  {
    title: "What is an array in Java?",
    topic: "Core Java",
    difficulty: "Easy" as const,
  },
  {
    title: "How do you declare and initialize an array in Java?",
    topic: "Core Java",
    difficulty: "Easy" as const,
  },
  {
    title: "What is the difference between Array and ArrayList?",
    topic: "Core Java",
    difficulty: "Medium" as const,
  },
  {
    title: "How do you find the largest element in an array?",
    topic: "Arrays",
    difficulty: "Medium" as const,
  },
  {
    title: "How do you reverse an array?",
    topic: "Arrays",
    difficulty: "Easy" as const,
  },
  {
    title: "How do you remove an element from an array?",
    topic: "Arrays",
    difficulty: "Medium" as const,
  },
];

function SearchResults() {
  const [searchParams] = useSearchParams();

const query = searchParams.get("q") || "";
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: 600,
          }}
        >
          Found {questions.length} results for{" "}
          <Box
            component="span"
            sx={{
              color: "#2563EB",
              fontWeight: 700,
            }}
          >
            {query || "All Questions"}
          </Box>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            Sort by:
          </Typography>

          <Select
            size="small"
            defaultValue="Relevance"
            sx={{
              bgcolor: "#FFFFFF",
              width: 150,
              borderRadius: 2,
            }}
          >
            <MenuItem value="Relevance">
              Relevance
            </MenuItem>

            <MenuItem value="Newest">
              Newest
            </MenuItem>

            <MenuItem value="Oldest">
              Oldest
            </MenuItem>
          </Select>
        </Box>
      </Box>

      {questions.map((question, index) => (
        <SearchResultCard
          key={index}
          number={index + 1}
          title={question.title}
          topic={question.topic}
          difficulty={question.difficulty}
        />
      ))}
    </Box>
  );
}

export default SearchResults;