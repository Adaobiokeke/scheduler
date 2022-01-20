const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value}
    case SET_APPLICATION_DATA:
      return { 
          ...state,
          days: action.value.days, 
            appointments:action.value.appointments, 
            interviews: action.value.interviews,
        }
    case SET_INTERVIEW: 
    let currentDay = state.days.find(
        day => day.appointments.includes(action.id)
      );
      if(action.interview){
        currentDay.spots -= 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };
        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;
        return { ...state, appointments: appointments, days: newDaysArr };
      } else{
        currentDay.spots += 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: null
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };

        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;
    
    
      return { 
          ...state, 
          appointments: appointments, 
          days: newDaysArr
         }
    
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export default reducer;