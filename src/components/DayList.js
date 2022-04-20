import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days;
  const dayArray = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.day === day.name}
        setDay={props.setDay}
      />
    )
  });
  return (
    <ul>
      {dayArray}
    </ul>
  )
}