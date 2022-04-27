import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((responses) => {
      const daysData = responses[0].data;
      const appointmentData = responses[1].data
      const interviewerData = responses[2].data
      setState(prev => ({...prev, days: daysData, appointments: appointmentData, interviewers: interviewerData}));
    })
  }, []);


  const updateSpots = function(state, appointments) {
    //find the day
     const dayObj = state.days.find(d => d.name === state.day);
    
    //look at the appointment id's (array)
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      //count the ones where appointment is null (falsey)
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = {...dayObj, spots};
    const days = state.days.map(d => d.name === state.day ? day : d);
    
    //return an updated days array
     return days;
    
  }

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(state, appointments)
        setState({...state, days, appointments});
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments)
      setState({...state, days, appointments});
    })
  };

  return {state, setDay, bookInterview, cancelInterview}

}