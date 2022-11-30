import { createTheme } from "@mui/material/styles";
import { red, blue, indigo, purple } from "@mui/material/colors";

export const theme = createTheme({
  breakpoints: {
    keys: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    values: {
      xxs: 0,
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
      xxl: 2000,
      xxxl: 3500,
    },
  },
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: red[900],
    },
    text: {
      primary: indigo[800],
    },
  },
  typography: {
    fontFamily: "Segoe UI",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#b2102f",
          fontSize: 15,
        },
      },
    },
      MuiGrid:{
       styleOverrides: {
        root: {
          display: 'flex',
            justifyContent: 'center',   
              }
            }
          },
          MuiCard:{
            styleOverrides: {
              root: {
                boxShadow: '#ff7038',
                "&:hover": {
                  boxShadow: "0 2px 2px #FFD700",
                },
                "&:active": {
                  boxShadow: "0 2px 2px #fff",
                },
              }   
            }
          }
  },
});
