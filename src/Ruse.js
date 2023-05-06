import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default function Ruse() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");

  function handleRun() {
    console.log(`Run: ${exp}`);
    fetch('/api/ruse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({exp: exp})
    })
      .then(response => response.json())
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
          <Form.Control onChange={e => setExp(e.target.value)}/>
          <Button onClick={handleRun}>Run</Button>
        </InputGroup>
      </div>
      <p role='paragraph' >{result}</p>
    </div>
  );
};
