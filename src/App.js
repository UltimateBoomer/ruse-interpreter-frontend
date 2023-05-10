import { Container, CssBaseline, ThemeProvider, Typography, createTheme, useMediaQuery } from "@mui/material";
import Ruse from "./Ruse";
import { useEffect, useMemo } from "react";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light"
    }
  }), [prefersDarkMode]);

  useEffect(() => {
    document.title = "Ruse Intepreter";
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{my: 4}}>
        <Typography variant="h4" sx={{my: 2}}>
          Ruse Interpreter
        </Typography>
        <Ruse />
      </Container>
    </ThemeProvider>
    
  );
}
