import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
// import FormSelect from "react-bootstrap/FormSelect";
// import InputGroup from "react-bootstrap/InputGroup";

export default function Ruse() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");
  const [langs, setLangs] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    fetch("/api/ruse/langs")
      .then(response => response.json())
      .then(json => {
        console.log(`Available lang: ${json}`);
        setLangs(json);
        setSelectedLang(json[0]);
      });
  }, []);
    

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleRun();
    }
  }

  function handleRun() {
    console.log(`Run: ${exp}`);
    fetch("/api/ruse/interp", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        lang: selectedLang,
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
      <FormControl variant="standard" sx={{m: 1, minWidth: 200}}>
        <InputLabel>Language</InputLabel>
        <Select
          value={selectedLang}
          onChange={e => setSelectedLang(e.target.value)}
        >
          {langs.map((l, i) => (
            <MenuItem value={l}>{l}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
        <TextField onChange={e => setExp(e.target.value)} onKeyDown={handleKeyDown}/>
        <Button onClick={handleRun}>Run</Button>
      </FormGroup>
      <p role="paragraph" >{result}</p>
    </div>
  );
};
