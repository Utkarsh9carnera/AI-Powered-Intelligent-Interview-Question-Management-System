import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Manrope', sans-serif",
  },

  palette: {
    primary: {
      main: "#2563EB",
    },

    background: {
      default: "#F8FBFF",
    },
  },
});

export default theme;