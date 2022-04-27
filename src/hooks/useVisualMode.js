import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //function for setting the history when transitioning between different views on the browser
  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode])
    } else {
      setHistory(prev => [...prev, mode])
    }
  };

  // function for returning the previous info after cancelling an action or closing an error
  const back = () => {
    if (history.length <= 1) {
      return setMode(initial)
    };
    setMode(history[history.length-2])
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  }

  return { mode, transition, back };
};