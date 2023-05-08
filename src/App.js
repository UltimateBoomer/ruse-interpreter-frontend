// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Ruse from './Ruse';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = "Ruse Intepreter";
  })

  return (
    <Container className="p-3">
      <h1>Ruse Interpreter</h1>
      <Ruse />
    </Container>
  );
}
