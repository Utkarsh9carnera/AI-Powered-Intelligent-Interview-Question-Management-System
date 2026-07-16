import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Chip,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const quotes = [
  "Prepare today. Crack tomorrow's interview.",
  "Success is where preparation meets opportunity.",
  "Every interview is one step closer to your dream job.",
  "Confidence comes from preparation.",
  "Practice smarter, not harder.",
  "Small improvements every day lead to big success.",
  "Your next opportunity starts with one question.",
  "Stay curious. Stay prepared.",
  "Every expert was once a beginner.",
  "Dream big. Prepare bigger.",
  "The future depends on what you do today.",
  "Discipline beats motivation every time.",
];

const topics = [
  "Java",
  "Python",
  "DBMS",
  "Operating Systems",
  "React",
  "SQL",
  "System Design",
];

function DashboardHome() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const quote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#F9FBFD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "78%",
          maxWidth: "1100px",
          textAlign: "center",
        }}
      >
        {/* Quote */}

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 48,
            },
            fontWeight: 500,
            color: "#111827",
            mb: 8,
          }}
        >
          "{quote}"
        </Typography>

        {/* Search Bar */}

        <Paper
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            py: 1.5,
            px: 3,
            bgcolor: "#FFFFFF",
          }}
        >
          <SearchRoundedIcon
            sx={{
              color: "#6B7280",
              fontSize: 34,
              mr: 2,
            }}
          />

          <InputBase
            placeholder="Search interview questions..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{
              flex: 1,
              fontSize: 22,
              color: "#111827",
            }}
          />

          <IconButton
            onClick={handleSearch}
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#2563EB",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            <ArrowForwardRoundedIcon fontSize="medium" />
          </IconButton>
        </Paper>

        {/* Popular Topics */}

        <Typography
          sx={{
            mt: 7,
            mb: 3,
            fontSize: 28,
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Popular Topics
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {topics.map((topic) => (
            <Chip
              key={topic}
              label={topic}
              clickable
              onClick={() =>
                navigate(`/search?q=${encodeURIComponent(topic)}`)
              }
              sx={{
                px: 2,
                py: 2.8,
                fontSize: 16,
                borderRadius: "999px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                transition: "0.25s",

                "&:hover": {
                  bgcolor: "#2563EB",
                  color: "#FFFFFF",
                  borderColor: "#2563EB",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardHome;