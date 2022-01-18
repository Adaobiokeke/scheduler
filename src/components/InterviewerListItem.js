/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";



const InterviewerListItem = function (props) {
  let InterviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  const displayName = () => {
    if (props.selected) {
      return <span>{props.name}</span>;
    }
  };
  return (
    <>
      <li
        className={InterviewerClass}
        onClick={() => props.setInterviewer(props.name)}
      >
        <img
          className="interviewers__item-image interviewers__item--selected-image"
          src={props.avatar}
          alt={props.name}
        />
        {displayName()}
      </li>
    </>
  );
};
export default InterviewerListItem;
