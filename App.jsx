// frontend/src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";

export default function App() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("face-swap");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  const uploadFile = async (f) => {
    const form = new FormData();
    form.append("file", f);
    const res = await axios.post(`${BACKEND_URL}/api/upload`, form);
    return res.data;
  };

  const handleGenerate = async () => {
    setStatus("Starting...");
    try {
      if (mode === "face-swap") {
        const form = new FormData();
        if (source) form.append("source", source);
        if (target) form.append("target", target);
        setStatus("Uploading files...");
        const res = await axios.post(`${BACKEND_URL}/api/swap`, form, { headers: { "Content-Type": "multipart/form-data" } });
        setResult(res.data);
        setStatus("Swap job submitted.");
      } else if (mode === "text-video") {
        setStatus("Sending prompt to video API...");
        const res = await axios.post(`${BACKEND_URL}/api/video`, { prompt, duration: 30 });
        setResult(res.data);
        setStatus("Video job submitted.");
      } else if (mode === "dress-swap") {
        const form = new FormData();
        if (source) form.append("source", source);
        if (target) form.append("target", target);
        const res = await axios.post(`${BACKEND_URL}/api/swap`, form, { headers: { "Content-Type": "multipart/form-data" } });
        setResult(res.data);
        setStatus("Dress-swap job submitted.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Smart AI Face Swap</h1>
      <div style={{ marginBottom: 12 }}>
        <label>Mode: </label>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="face-swap">Face Swap (image/video)</option>
          <option value="dress-swap">Dress Swap (image)</option>
          <option value="text-video">Text → Video</option>
        </select>
      </div>

      {(mode === "face-swap" || mode === "dress-swap") && (
        <>
          <div>
            <label>Source (your photo): </label>
            <input type="file" onChange={e => setSource(e.target.files[0])} />
          </div>
          <div>
            <label>Target (photo to swap into): </label>
            <input type="file" onChange={e => setTarget(e.target.files[0])} />
          </div>
        </>
      )}

      {mode === "text-video" && (
        <div>
          <label>Prompt: </label>
          <input style={{ width: "100%" }} value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe the video you want" />
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={handleGenerate}>Generate</button>
      </div>

      <div style={{ marginTop: 18 }}>
        <strong>Status:</strong> {status}
      </div>

      <div style={{ marginTop: 12 }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
