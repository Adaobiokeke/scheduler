export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let secondState = { ...state };
  if (secondState.days.length === 0) {
    return [];
  }
  let result = secondState.days.filter(d => d.name === day);
  if (result.length === 0) {
    return [];
  }
  let appointmentsForDay = result[0].appointments;
  let appointmentsKeys = Object.keys(secondState.appointments);
  let finalResult = [];
  for (let appID of appointmentsForDay) {
    if (appointmentsKeys.includes(appID.toString())) {
      finalResult.push(secondState.appointments[appID.toString()]);
    }
  }
  return finalResult;
}
// export function getInterview(state, interview) {
//   //... returns an interview object for the given interview
//   //... or null if there is no interview
//   let secondState = { ...state };
//   let finalResult = {};
//   const appointmentsValues = Object.values(secondState.appointments);
//   if (interview === null) {
//     return null;
//   }
//   // eslint-disable-next-line array-callback-return
//   appointmentsValues.map(appointment => {
//     let interviewersKeys = Object.keys(secondState.interviewers);
//     let interviewersId = interview.interviewer;
//     let interviewerDetails = {};
//     if (interviewersKeys.includes(interviewersId.toString())) {
//       interviewerDetails = secondState.interviewers[interviewersId.toString()];
//       finalResult = {
//         student: interview.student,
//         interviewer: interviewerDetails,
//       };
//     }
//   });
//   return finalResult;
// }

export function getInterview(state, interview) {
  let interviewersObj = state.interviewers;
  let result = {};

  if(!interviewersObj || !interview){
    return null;
  }

  for(const key of Object.keys(interviewersObj)){
    let interviewer = interviewersObj[key];
    if(interviewer.id === interview.interviewer){
      result["interviewer"] = interviewer;
      result["student"] = interview.student;
    }
  }
  return result;
}
export function getInterviewersForDay(state, day) {
  //... returns an array of interviews for that day
  let secondState = { ...state };
  if (secondState.days.length === 0) {
    return [];
  }
  let result = secondState.days.filter(d => d.name === day);
  if (result.length === 0) {
    return [];
  }
  let interviewersForDay = result[0].interviewers;
  let interviewersKeys = Object.keys(secondState.interviewers);
  let finalResult = [];
  for (let interviewerID of interviewersForDay) {
    if (interviewersKeys.includes(interviewerID.toString())) {
      finalResult.push(secondState.interviewers[interviewerID.toString()]);
    }
  }
  return finalResult;
}