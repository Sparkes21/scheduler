import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode])
      //setHistory([...history.slice(0, -1), mode])
    } else {
      setHistory(prev => [...prev, mode])
      //setHistory([...history, mode]);
    }
  };

  const back = () => {
    if (history.length <= 1) {
      return setMode(initial)
    };
    setMode(history[history.length-2])
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  }

  return { mode, transition, back };
};