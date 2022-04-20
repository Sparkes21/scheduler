import React from "react";
import "components/InterviewerListItem.scss";
import { process_params } from "express/lib/router";
import classNames from "classnames";

export default function InterviewerListItem(props) {

 const formatName = () => {
   if (props.selected) {
     return props.name
   } else {
     return "";
   }
  };
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li onClick={() => {props.setInterviewer(props.id)}} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {formatName()}
    </li>
  )
}