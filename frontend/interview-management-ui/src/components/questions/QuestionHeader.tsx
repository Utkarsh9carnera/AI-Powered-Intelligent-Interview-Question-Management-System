import { useNavigate } from "react-router-dom";

import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

type QuestionHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function QuestionHeader({
  search,
  onSearchChange,
}: QuestionHeaderProps) {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 4,
        px: 2,
        py: 1,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
      }}
    >
      <SearchIcon
        sx={{
          color: "#64748B",
        }}
      />

      <InputBase
        placeholder="Search interview questions..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        sx={{
          ml: 2,
          flex: 1,
          fontSize: 16,
        }}
      />

      <IconButton
        onClick={handleSearch}
        sx={{
          width: 46,
          height: 46,
          bgcolor: "#2563EB",
          color: "#FFFFFF",
          "&:hover": {
            bgcolor: "#1D4ED8",
          },
        }}
      >
        <ArrowForwardRoundedIcon />
      </IconButton>
    </Paper>
  );
}

export default QuestionHeader;