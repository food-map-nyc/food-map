import { createTheme } from "@mui/material/styles";
import {red, blue } from "@mui/material/colors"

export const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: "#2962ff",
      },
      text: {
        primary: "#2962ff"
      }
    },
    typography: {
      fontFamily: "monospace",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#2962ff",
                    border: "#2962ff",
                    fontSize: 15
                }
            }
        },
    }
  });
