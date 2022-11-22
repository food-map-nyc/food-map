import React from "react";

import Navbar from "../features/navbar/NavBar";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../public/style"

const App = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
};

export default App;
