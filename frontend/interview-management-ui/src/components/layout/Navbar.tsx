import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        >
          AI Interview Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            Utkarsh
          </Typography>

          <Avatar>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;