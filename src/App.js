import { Container, Typography } from "@mui/material";
import Ruse from "./Ruse";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Ruse Intepreter";
  })

  return (
    <Container maxWidth="sm" sx={{my: 4}}>
      <Typography variant="h4" sx={{my: 2}}>
        Ruse Interpreter
      </Typography>
      <Ruse />
    </Container>
  );
}
