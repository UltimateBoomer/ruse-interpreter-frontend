import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
// import FormSelect from "react-bootstrap/FormSelect";
// import InputGroup from "react-bootstrap/InputGroup";

export default function Ruse() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");
  const [isOk, setIsOk] = useState(true);
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
        setIsOk(true);
      })
      .catch(err => {
        setResult("Interp encountered an error");
        setIsOk(false);
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
          {langs.map(l => (
            <MenuItem value={l}>{l}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
        <TextField
          placeholder="Enter code here"
          autoFocus
          inputProps={{style: {fontFamily: "monospace"}}}
          onChange={e => setExp(e.target.value)} onKeyDown={handleKeyDown}
        />
        <Button onClick={handleRun}>Run</Button>
      </FormGroup>
      <Typography
        sx={{fontFamily: "monospace", color: isOk ? "" : "red"}}
      >
        {result}
      </Typography>
    </div>
  );
};
