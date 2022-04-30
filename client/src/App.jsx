import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>PLACEHOLDER FOR JOB HUNT TRACKER V.1</h1>
    </ThemeProvider>
  );
};

export default App;
