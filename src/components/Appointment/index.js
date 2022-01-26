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
export default function Appointment(props) {
  // {
  //   id,
  //   time,
  //   interview,
  //   student,
  //   interviewers,
  //   bookInterview,
  //   cancelInterview
  // }


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
   props.interview == null ? EMPTY : SHOW
  );

 //saving interview
  const save =(name, interviewer) =>{
    
     if (name && interviewer) {
       transition(SAVING);
      
      const interview = {
        student: name,
        interviewer
      };

      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
     }
  }

 //removing interview
  // const remove = () => {
  //   if (mode === SHOW) {
  //     transition(CONFIRM);
  //   } else {
  //     transition(DELETING);
  //     cancelInterview(id).then(
  //       () => transition(EMPTY),
  //       error => {
  //         console.log("Delete error:", error);
  //         transition(ERROR_DELETE, true);
  //       }
  //     );
  //   }
  // };

  function destroy(event){
    if(mode === CONFIRM){

      transition(DELETING, true);
    
     props.cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE,true));
    }  else{
    transition(CONFIRM);
  }
}
  const edit = () => {
    transition(EDIT);
  };

  const errorClose = () => {
    back();
  };



  // side effect that listens for changes to the interview, transition or mode values
  useEffect(() =>{
  if(props.interview && mode === EMPTY) {
    transition(SHOW);
  }
  if (props.interview === null && mode ===SHOW){
    transition(EMPTY);
  }
 },[props.interview,transition,mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} 
        name={props.name}
        value={props.value}
        onSave={save}
        onCancel={back}/>
      )}

      {mode === EDIT && (
        <Form
        name={props.name ? props.name : props.interview.student}
        value={props.value ? props.value: props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Saving"/>}

      {mode === DELETING && <Status message="Deleting"/>}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment"
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message = "could not book appointment." onClose={back}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message = "could not book appointment." onClose={back}/>
      )}

    </article>
  )
}