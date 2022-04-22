export function getAppointmentsForDay(state, day) {
  let dayObject = state.days.find((currentDay) => {
    return currentDay.name === day
  });  
  if (typeof dayObject === "undefined") {
    return [];
  }
  return Object.values(state.appointments).filter((appointment) => {
    return dayObject.appointments.includes(appointment.id)
  })
}

export function getInterview(state, interview) {
  let interviewersObj = state.interviewers;
  let result = {};

  if(!interviewersObj || !interview){
    return null;
  }

  for(const key of Object.keys(interviewersObj)){
    let interviewer = interviewersObj[key];
    if(interviewer.id === interview.interviewer){
      result["interviewer"] = interviewer;
      result["student"] = interview.student;
    }
  }
  return result;
}