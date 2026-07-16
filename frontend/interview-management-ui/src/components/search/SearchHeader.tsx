import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import SettingsMenu from "./SettingsMenu";

function SearchHeader() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: 72,
        px: 3,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mr: 4,
        }}
      >
        <AutoStoriesIcon
          sx={{
            color: "#2563EB",
            fontSize: 32,
          }}
        />

        <Box
          sx={{
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          AI Interview
        </Box>
      </Box>

      <IconButton
        onClick={() => navigate("/dashboard")}
        sx={{ mr: 3 }}
      >
        <HomeOutlinedIcon />
      </IconButton>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          borderRadius: "14px",
          border: "1px solid #E5E7EB",
          px: 2,
          py: 0.5,
        }}
      >
        <SearchIcon sx={{ color: "#6B7280" }} />

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
            ml: 2,
            flex: 1,
            fontSize: 16,
          }}
        />

        <IconButton
          onClick={handleSearch}
          sx={{
            bgcolor: "#2563EB",
            color: "#fff",
            width: 42,
            height: 42,
            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
      </Paper>

      <Box sx={{ ml: 3 }}>
        <SettingsMenu />
      </Box>
    </Paper>
  );
}

export default SearchHeader;