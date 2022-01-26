import React, { useEffect } from "react";

import "./index.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "../hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


/**
 * Returns the entire appointment view
 * @param {} param0 
 */
export default function (
  {
    id,
    time,
    interview,
    student,
    interviewers,
    bookInterview,
    cancelInterview
  }
) {

  //listing all possible  modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Object that specifies the modes
  const { mode, transition, back } = useVisualMode(
    interview == null ? EMPTY : SHOW
  );

//saving interview
  const save =(name, interviewer) =>{
    
    if (name && interviewer) {
      transition(SAVING);

      const interview = {
        student: name,
        interviewer
      };
      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
    }
  }

 //removing interview
  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      cancelInterview(id).then(
        () => transition(EMPTY),
        error => {
          console.log("Delete error:", error);
          transition(ERROR_DELETE, true);
        }
      );
    }
  };

  const edit = () => {
    transition(EDIT);
  };





  // side effect that listens for changes to the interview, transition or mode values
  useEffect(() =>{
  if(interview && mode === EMPTY) {
    transition(SHOW);
  }
  if (interview === null && mode ===SHOW){
    transition(EMPTY);
  }
},[interview,transition,mode]);

  return (
    <article data-testid="appointment">
      <Header time={time}></Header>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && <Empty onAdd={transition} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview}
          onDelete={remove}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment"
          onCancel={back}
          onConfirm={remove}
        />
      )}

      {mode === EDIT && (
        <Form
          name={student}
          interviewer={interview}
          onCancel={back}
          onSave={save}
          interviewers={interviewers}
        />
      )}

    </article>
  );
}