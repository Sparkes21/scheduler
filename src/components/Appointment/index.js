import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
console.log("my props", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVE = "SAVE";
  const CREATE = "CREATE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview).then(() => {transition(SHOW)});
  };

  const remove = () => {
    transition(DELETE)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY)
    })
  };

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SHOW && (
          <Show
            name={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
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
        {mode === SAVE && <Status message={"Saving"}/>}

        {mode === DELETE && <Status message={"Deleting"}/>}

        {mode === CONFIRM && <Confirm 
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you want to delete?"
        />}
          {console.log("props in index", props)}
        {mode === EDIT && (<Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
        )}


      </article>
    </Fragment>
  )
}