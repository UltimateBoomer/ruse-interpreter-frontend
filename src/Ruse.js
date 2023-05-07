import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default function Ruse() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleRun();
    }
  }

  function handleRun() {
    console.log(`Run: ${exp}`);
    fetch('/api/ruse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        lang: 'FAUX_RACKET',
        exp: exp
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Interp error');
          setResult('Interp encountered an error');
        }
      })
      .then(data => {
        const res = data.result;
        console.log(`Result: ${res}`);
        setResult(res);
      });
  }

  return (
    <div>
      <div>
        <InputGroup>
          <InputGroup.Text>Interp</InputGroup.Text>
          <Form.Control onChange={e => setExp(e.target.value)} onKeyDown={handleKeyDown}/>
          <Button onClick={handleRun}>Run</Button>
        </InputGroup>
      </div>
      <p role='paragraph' >{result}</p>
    </div>
  );
};
