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