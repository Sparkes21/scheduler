import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getInterviewersForDay, getInterview, getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log("dailyinterviewers", dailyInterviewers);
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

  const appointmentListComponents = dailyAppointments.map((appointment) => {
    console.log("appointment", appointment);
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    )
  });
  
  if (state.days.length === 0) {
    return <>no days available</>
  } 
  return (
    <main className="layout">
      <section className="sidebar" >
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {appointmentListComponents}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
