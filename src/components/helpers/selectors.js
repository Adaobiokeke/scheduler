// import { stat } from "fs";

// /**
//  * Returns appointments for day
//  * @param {*} state 
//  * @param {*} day 
//  */
// export function getAppointmentsForDay(state, day) {

//   if(!state.days){
//     return [];
//   }
//   let theDay = state.days.filter(d => d.name === day)[0];
//   if(!theDay){
//     return [];
//   }
//   let result = [];
//   for(const id in theDay.appointments){
//     const appointmentObj = state.appointments[id];
//     result.push(appointmentObj);
//   }

//   return result;
// }

// /**
//  * Returns interviews correspoind to interview id
//  * @param {*} state 
//  * @param {*} interview 
//  */
// export function getInterview(state, interview) {
//   let interviewersObj = state.interviewers;
//   let result = {};

//   if(!interviewersObj || !interview){
//     return null;
//   }

//   for(const key of Object.keys(interviewersObj)){
//     let interviewer = interviewersObj[key];
//     if(interviewer.id === interview.interviewer){
//       result["interviewer"] = interviewer;
//       result["student"] = interview.student;
//     }
//   }
//   return result;
// }

// /**
//  * Returns an array of interviewer object of day
//  */
// export function getInterviewersForDay(state, day){
//   let result = [];
//   let days = state.days;
//   let interviewersForStateDay;

//   //Checks validity of state.days
//   if(state.days.length < 1){
//     return [];
//   }

//   //Retrieves interviewers for day
//   for(const stateDay of days){
//     if(stateDay.name === day){
//       interviewersForStateDay = stateDay.interviewers;
//     }
//   }

//   //if no day is found, return empty []
//   if(!interviewersForStateDay){
//     return [];
//   }

//   //Push interviewer objects to results;
//   for(const id of interviewersForStateDay){
//     let interviewer = state.interviewers[id];
//     result.push(interviewer);
//   }

//   return result;
// }

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let stateCopy = { ...state };
  if (stateCopy.days.length === 0) {
    return [];
  }
  let result = stateCopy.days.filter(d => d.name === day);
  if (result.length === 0) {
    return [];
  }
  let appointmentsForDay = result[0].appointments;
  let appointmentsKeys = Object.keys(stateCopy.appointments);
  let finalResult = [];
  for (let appID of appointmentsForDay) {
    if (appointmentsKeys.includes(appID.toString())) {
      finalResult.push(stateCopy.appointments[appID.toString()]);
    }
  }
  return finalResult;
}
export function getInterview(state, interview) {
  //... returns an interview object for the given interview
  //... or null if there is no interview
  let stateCopy = { ...state };
  let finalResult = {};
  const appointmentsValues = Object.values(stateCopy.appointments);
  if (interview === null) {
    return null;
  }
  appointmentsValues.map(appointment => {
    let interviewersKeys = Object.keys(stateCopy.interviewers);
    let interviewersId = interview.interviewer;
    let interviewerDetails = {};
    if (interviewersKeys.includes(interviewersId.toString())) {
      interviewerDetails = stateCopy.interviewers[interviewersId.toString()];
      finalResult = {
        student: interview.student,
        interviewer: interviewerDetails,
      };
    }
  });
  return finalResult;
}
export function getInterviewersForDay(state, day) {
  //... returns an array of interviews for that day
  let stateCopy = { ...state };
  if (stateCopy.days.length === 0) {
    return [];
  }
  let result = stateCopy.days.filter(d => d.name === day);
  if (result.length === 0) {
    return [];
  }
  let interviewersForDay = result[0].interviewers;
  let interviewersKeys = Object.keys(stateCopy.interviewers);
  let finalResult = [];
  for (let interviewerID of interviewersForDay) {
    if (interviewersKeys.includes(interviewerID.toString())) {
      finalResult.push(stateCopy.interviewers[interviewerID.toString()]);
    }
  }
  return finalResult;
}