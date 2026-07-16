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

type QuestionFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;

  topic: string;
  onTopicChange: (value: string) => void;

  difficulty: string;
  onDifficultyChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
};

function QuestionFilters({
  search,
  onSearchChange,
  topic,
  onTopicChange,
  difficulty,
  onDifficultyChange,
  status,
  onStatusChange,
}: QuestionFiltersProps) {
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
          placeholder="Search by question title, topic or difficulty..."
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
        value={topic}
        onChange={(e) =>
          onTopicChange(e.target.value)
        }
        size="small"
        sx={{
          width: 160,
          height: 48,
        }}
      >
        <MenuItem value="">
          All Topics
        </MenuItem>

        <MenuItem value="Java">
          Java
        </MenuItem>

        <MenuItem value="React">
          React
        </MenuItem>

        <MenuItem value="SQL">
          SQL
        </MenuItem>
      </Select>

      <Select
        value={difficulty}
        onChange={(e) =>
          onDifficultyChange(e.target.value)
        }
        size="small"
        sx={{
          width: 170,
          height: 48,
        }}
      >
        <MenuItem value="">
          All Difficulty
        </MenuItem>

        <MenuItem value="Easy">
          Easy
        </MenuItem>

        <MenuItem value="Medium">
          Medium
        </MenuItem>

        <MenuItem value="Hard">
          Hard
        </MenuItem>
      </Select>

      <Select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
        size="small"
        sx={{
          width: 150,
          height: 48,
        }}
      >
        <MenuItem value="">
          All Status
        </MenuItem>

        <MenuItem value="true">
          Active
        </MenuItem>

        <MenuItem value="false">
          Inactive
        </MenuItem>
      </Select>

      <Button
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
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

export default QuestionFilters;