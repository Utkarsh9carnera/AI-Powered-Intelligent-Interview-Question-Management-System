import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

function FilterSidebar() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 270,
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
  sx={{
    fontWeight: 700,
  }}
>
          Filters
        </Typography>

        <Button size="small">
          Clear all
        </Button>
      </Box>

      {/* Topic */}

      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Topic
          </Typography>
        </AccordionSummary>

        <AccordionDetails>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Core Java"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Data Structures"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Interview Questions"
          />

        </AccordionDetails>
      </Accordion>

      {/* Difficulty */}

      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Difficulty
          </Typography>
        </AccordionSummary>

        <AccordionDetails>

          <FormControlLabel
            control={<Checkbox />}
            label="Easy"
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Medium"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Hard"
          />

        </AccordionDetails>
      </Accordion>

      {/* Organization */}

      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Organization
          </Typography>
        </AccordionSummary>

        <AccordionDetails>

          <Select
            fullWidth
            size="small"
            defaultValue=""
          >
            <MenuItem value="">
              Select organization
            </MenuItem>

            <MenuItem value="Google">
              Google
            </MenuItem>

            <MenuItem value="Microsoft">
              Microsoft
            </MenuItem>

          </Select>

        </AccordionDetails>
      </Accordion>

      {/* Manager */}

      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Manager
          </Typography>
        </AccordionSummary>

        <AccordionDetails>

          <Select
            fullWidth
            size="small"
            defaultValue=""
          >
            <MenuItem value="">
              Select manager
            </MenuItem>

            <MenuItem value="John">
              John
            </MenuItem>

            <MenuItem value="David">
              David
            </MenuItem>

          </Select>

        </AccordionDetails>
      </Accordion>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<TuneOutlinedIcon />}
        sx={{
          mt: 2,
          borderRadius: 2,
        }}
      >
        More Filters
      </Button>

    </Paper>
  );
}

export default FilterSidebar;