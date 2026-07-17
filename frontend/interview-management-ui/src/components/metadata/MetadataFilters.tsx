import {
  Box,
  Button,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

type MetadataFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;
};

function MetadataFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
}: MetadataFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          px: 2,
          height: 48,
        }}
      >
        <SearchIcon
          sx={{
            color: "#94A3B8",
          }}
        />

        <InputBase
          placeholder="Search metadata..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          sx={{
            ml: 2,
            flex: 1,
          }}
        />
      </Paper>

      <Select
        value={type}
        onChange={(e) =>
          onTypeChange(e.target.value)
        }
        size="small"
        sx={{
          width: 180,
          height: 48,
        }}
      >
        <MenuItem value="">
          All Types
        </MenuItem>

        <MenuItem value="Topic">
          Topic
        </MenuItem>

        <MenuItem value="Difficulty">
          Difficulty
        </MenuItem>

        <MenuItem value="Skill">
          Skill
        </MenuItem>

        <MenuItem value="Category">
          Category
        </MenuItem>
      </Select>

      <Button
        variant="outlined"
        startIcon={
          <FilterAltOutlinedIcon />
        }
        sx={{
          height: 48,
          px: 3,
          borderRadius: 2,
        }}
      >
        FILTER
      </Button>
    </Box>
  );
}

export default MetadataFilters;