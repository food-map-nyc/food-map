import { createTheme } from "@mui/material/styles";
import {red, blue, indigo, purple } from "@mui/material/colors"

export const theme = createTheme({
  breakpoints: {
    keys: [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
      "xxxl",
    ],
    values: {
      "xxs": 0,
      "xs": 300,
      "sm":600,
      "md":900,
      "lg":1200,
      "xl":1400,
      "xxl":2000,
      "xxxl":3500,
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
        primary: indigo[800]
      }
    },
    typography: {
      fontFamily: "cursive",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#b2102f",
                    border: purple[800],
                    fontSize: 15
                }
            }
        },
    }
  });
