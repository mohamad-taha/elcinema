import { createTheme } from "@mui/material";

export const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f3951e",
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "rubik",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "rubik",
        },
      },
    },
  },
});
