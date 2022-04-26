import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getInterviewersForDay, getInterview, getAppointmentsForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments= getAppointmentsForDay(state, state.day).map(
    // console.log("appointment", appointment);
    appointment => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
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
          {appointments}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
