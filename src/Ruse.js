import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
    

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleRun();
    }
  }

  function handleRun() {
    var res;
    fetch("/api/ruse/interp", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        lang: selectedLang,
        exp: exp
      })
    })
      .then(response => {
        res = response;
        return response.json();
      })
      .then(data => {
        if (res.ok) {
          setResult(data.result);
          setIsOk(true);
        } else {
          setResult(`Interp error: ${data.message}`)
          setIsOk(false);
        }
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
          {langs.map((l, i) => (
            <MenuItem key={i} value={l}>{l}</MenuItem>
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
        role="paragraph"
        sx={{fontFamily: "monospace", color: isOk ? "" : "red", whiteSpace: "break-spaces"}}
      >
        {result}
      </Typography>
    </div>
  );
};
