import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const history = [
  "Array in Java",
  "HashMap in Java",
  "Singleton Design Pattern",
  "List vs Set in Java",
  "Java OOPs Concepts",
];

function SearchHistory() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
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
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Search History
        </Typography>

        <Typography
          sx={{
            color: "#2563EB",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          View all
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {history.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              px: 0,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 34,
              }}
            >
              <HistoryRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#64748B",
                }}
              />
            </ListItemIcon>

            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default SearchHistory;