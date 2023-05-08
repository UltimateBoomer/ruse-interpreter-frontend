import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import InputGroup from "react-bootstrap/InputGroup";

export default function Ruse() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");
  const [langs, setLangs] = useState([]);
  const selectedLang = useRef("");

  useEffect(() => {
    fetch('/api/ruse/langs')
      .then(response => response.json())
      .then(json => {
        console.log(`Available lang: ${json}`);
        setLangs(json);
        selectedLang.current = json[0];
      });
  }, []);
    

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleRun();
    }
  }

  function handleRun() {
    console.log(`Run: ${exp}`);
    fetch('/api/ruse/interp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        lang: selectedLang.current,
        exp: exp
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        const res = data.result;
        console.log(`Result: ${res}`);
        setResult(res);
      })
      .catch(err => {
        setResult("Interp encountered an error");
      });
  }

  return (
    <div>
      <InputGroup>
        <FormSelect defaultValue={selectedLang} onChange={e => selectedLang.current = e}>
          {langs.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </FormSelect>
        <FormControl onChange={e => setExp(e.target.value)} onKeyDown={handleKeyDown}/>
        <Button onClick={handleRun}>Run</Button>
      </InputGroup>
      <p role='paragraph' >{result}</p>
    </div>
  );
};
