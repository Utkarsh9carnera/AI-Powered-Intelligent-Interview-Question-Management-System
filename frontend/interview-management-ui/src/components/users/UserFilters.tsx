import {
  Box,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

type UserFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function UserFilters({
  search,
  onSearchChange,
}: UserFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        mt: 4,
        mb: 3,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderRadius: 2,
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
          placeholder="Search by name, email or username..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            fontSize: 16,
          }}
        />
      </Paper>

      <FormControl
        sx={{
          minWidth: 160,
        }}
      >
        <Select
          defaultValue=""
          displayEmpty
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
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<FilterListRoundedIcon />}
        sx={{
          height: 56,
          px: 3,
        }}
      >
        FILTER
      </Button>
    </Box>
  );
}

export default UserFilters;