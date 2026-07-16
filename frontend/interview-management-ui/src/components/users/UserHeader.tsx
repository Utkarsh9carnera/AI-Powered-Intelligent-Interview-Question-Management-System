import {
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";

type UserHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function UserHeader({
  search,
  onSearchChange,
}: UserHeaderProps) {
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
        px: 2,
        py: 1,
        mb: 4,
        borderRadius: 3,
      }}
    >
      <SearchOutlinedIcon
        sx={{
          color: "text.secondary",
          mr: 1,
        }}
      />

      <InputBase
        fullWidth
        placeholder="Search interview questions..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <IconButton
        onClick={handleSearch}
        sx={{
          bgcolor: "#2563EB",
          color: "#FFFFFF",
          width: 44,
          height: 44,
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

export default UserHeader;