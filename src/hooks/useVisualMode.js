import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      setHistory([...history.slice(0, -1), mode])
    } else {
      setHistory([...history, mode]);
    }
  };

  const back = () => {
    if (history.length <= 1) {
      return setMode(initial)
    };

    history.pop()
    setMode(history[history.length-1])
    setHistory([...history])
  }

  return { mode, transition, back };
};