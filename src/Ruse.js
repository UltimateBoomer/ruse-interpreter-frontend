import { useState } from "react";

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
        <input type='text' onChange={e => setExp(e.target.value)}/>
        <button onClick={handleRun}>Run</button>
      </div>
      <p>{result}</p>
    </div>
  );
};