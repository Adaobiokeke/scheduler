import React, { Fragment, useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function ({
  name,
  interviewer,
  onCancel,
  onSave,
  interviewers,
}) {
  const [formName, setFormName] = useState(name || "");
  const [formInterviewer, setFormInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  // Resets Form to empty values

  const reset = function () {
    setFormName("");
    setFormInterviewer(null);
  };

  //  form Resets and cancels

  const cancel = function () {
    reset();
    onCancel();
  };

  // validate form entries

  function validate() {
    if (formName === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(formName, formInterviewer);
  }

  return (
    <Fragment>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              onChange={(event) => setFormName(event.target.value)}
              value={formName}
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          {formInterviewer ? (
            <InterviewerList
              interviewers={interviewers}
              value={formInterviewer.id}
              onChange={setFormInterviewer}
            />
          ) : (
            <InterviewerList
              interviewers={interviewers}
              value={formInterviewer}
              onChange={setFormInterviewer}
            />
          )}
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>
              Cancel
            </Button>
            <Button confirm onClick={validate}>
              Save
            </Button>
          </section>
        </section>
      </main>
    </Fragment>
  );
}
