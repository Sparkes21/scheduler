import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days;
  console.log("props.days", props.days);
  const dayArray = days.map((day) => {
    console.log("day", day);
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
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