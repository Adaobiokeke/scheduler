
// import React, { useState, useEffect } from 'react';
// import './Application.scss';
// import DayList from '../DayList';
// import Appointment from '../Appointment/index';
// import axios from 'axios';
// import {
//   getAppointmentsForDay,
//   getInterview,
//   getInterviewersForDay,
// } from '../helpers/selectors';


// export default function Application(props) {
//   const [state, setState] = useState({
//     day: 'Monday',
//     days: [],
//     appointments: [],
//     interviewers: {},
//   });

//   useEffect(() => {
//     //defining the URL variables
//     const dayURL = 'http://localhost:8080/api/days';
//     const appointmentURL = 'http://localhost:8080/api/appointments';
//     const interviewerURL = 'http://localhost:8080/api/interviewers';
   
//     Promise.all([
//       axios.get(dayURL),
//       axios.get(appointmentURL),
//       axios.get(interviewerURL),
//     ]).then(all => {
//       const [firstItem, secondItem, thirdItem] = all;
//           setState(prev => ({
//             ...prev,
//             days: firstItem.data,
//             appointments: secondItem.data,
//             interviewers: thirdItem.data,
//       }));
//     });
//   }, []);
  
//   const setDay = day => setState({ ...state, day });
  
//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     setState(prev => ({
//       ...prev,
//       appointments,
//     }))

// // UPDATE Endpoint

//     axios.put(`http://localhost:8080/api/appointments/${id}`, {interview})
//     .then(res => console.log(res))
//     .catch(error => {
//       console.log("Error:", error)
//     })
//   }

//   function cancelInterview(id){
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     setState(prev => ({
//       ...prev,
//       appointments,
//     }))

//     //delete endpoint

//   axios.delete(`http://localhost:8001/api/appointments/${id}`)
//   .then(res => console.log(res))
//   }

//   const dailyAppointments = getAppointmentsForDay(state, state.day);
//   const interviewers = getInterviewersForDay(state, state.day);
//   const schedule = dailyAppointments.map((appointment,key) => {
//     const interview = getInterview(state, appointment.interview);
//     return (
//       <>
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview ={cancelInterview}
//       />
//       </>
//     );
//   });
//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
        
//       </section>
//     </main>
//   );
// }


import React, { useState, useEffect } from "react";

import "./Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

/**
 * Renders entire application page
 * @param {*} props 
 */
export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);

  //Returns the schedule after looping through appointments
  const schedule = appointments.map(appointment => {
    let interview = getInterview(state, appointment.interview);
    let interviewers = getInterviewersForDay(state, state.day)
      if(interview){
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview.interviewer}
            student={interview.student}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            data-testid="appointment"
          />
        );
      }
      else{
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={null}
            interviewers={interviewers}
            bookInterview={bookInterview}
            data-testid="appointment"
          />
        );
      }
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            propDay={state.day}
            setDay={day => {
              setDay(day);
            }}
          />{" "}
        </nav>{" "}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>{" "}
      <section className="schedule"> {schedule}</section>{" "}
    </main>
  );
}