import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";


// Returns the Interviewer List of a form
 
export default function({interviewers, value, onChange}){
  
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{
        interviewers.map((interviewer) => 
          <InterviewerListItem
            key = {interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === value}
            setInterviewer = {event => {onChange(interviewer)}}
          />
        )
      }
    </ul>
  </section>
  );
}

