// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Ruse from './Ruse';
import Container from 'react-bootstrap/Container';

export default function App() {
  return (
    <Container className="p-3">
      <h1>Ruse Interpreter</h1>
      <Ruse />
    </Container>
  );
}
