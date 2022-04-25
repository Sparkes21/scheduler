import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
console.log("my props", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    transition(SHOW);
  };


  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
          name={props.name}
          onSave={save}
          interviewers={props.interviewers}
          onCancel= {() => back()}
          />
        )}

      </article>
    </Fragment>
  )
}