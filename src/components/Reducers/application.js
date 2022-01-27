/**
 * Reducer for handling all update and fetch states
 * @param {*} state 
 * @param {*} action 
 */
import actionTypes from "../Actions/types"

const { 
  SET_DAY,
  FETCH_DATA,
  SET_INTERVIEW
} = actionTypes

 const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return{...state, ...action.payload};

    case SET_DAY:
      return { ...state, day: action.payload };

    case SET_INTERVIEW:
      const {interview, id} = action.payload
      let currentDay = state.days.find(
        day => day.appointments.includes(id)
      );

      //Updates the spots information for that day and correct appointment information for a new interview and ready's for rendering
      if(interview){
        currentDay.spots -= 1;
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;
        return { ...state, appointments: appointments, days: newDaysArr };
      }

      //Updates spots information for that day and correct appoointment information for a null interview and ready's for rendering
      else{
        currentDay.spots += 1;
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        
        const appointments = {
          ...state.appointments,
          [ id]: appointment
        };

        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;

        return { ...state, appointments: appointments, days: newDaysArr };
      }


    //Fills the data from server database and ready's for rendering
    // case "setData":
    //   return {
    //     ...state,
    //     days: action.value.days,
    //     appointments: action.value.appointments,
    //     interviewers: action.value.interviewers

    //   };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default reducer;