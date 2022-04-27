import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVE = "SAVE";
  const CREATE = "CREATE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewerId) => {
    const interviewer = props.interviewers[interviewerId]
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  };

  const cancel = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
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
          onConfirm={cancel}
          onCancel={back}
          message="Are you sure you want to delete?"
        />}
        
        {mode === EDIT && (<Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />)}

        {mode === ERROR_DELETE && (<Error 
          message= "Could not cancel appointment"
          onClose={back}
        />)}

        {mode === ERROR_SAVE && (<Error 
          message= "Could not save appointment"
          onClose={back}
        />)}


      </article>
    </Fragment>
  )
}