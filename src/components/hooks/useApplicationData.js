import {useReducer,useEffect} from 'react'
import 'components/Application.scss';
import reducer from "../Reducers/reducers"
import axios from 'axios';



const useApplicationData = () => {
    const [state, dispatch] = useReducer(reducer,{
        day: 'Monday',
        days: [],
        appointments: [],
        interviewers: {},
      });
    
      
      
      const setDay = day => dispatch({type:"setDay",value: day });
      
      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        dispatch(prev => ({
          ...prev,
          appointments,
        }))
    
    // UPDATE Endpoint
    
        axios.put(`http://localhost:8080/api/appointments/${id}`, {interview})
        .then(res => console.log(res))
        .catch(error => {
          console.log("Error:", error)
        })
      }
    
      function cancelInterview(id){
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        dispatch(prev => ({
          ...prev,
          appointments,
        }))
    
        //delete endpoint
    
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => console.log(res))
      }

      useEffect(() => {
        //defining the URL variables
        let dayURL = 'http://localhost:8080/api/days';
        let appointmentURL = 'http://localhost:8080/api/appointments';
        let interviewerURL = 'http://localhost:8080/api/interviewers';
       
        Promise.all([
          axios.get(dayURL),
          axios.get(appointmentURL),
          axios.get(interviewerURL),
        ]).then(all => {
          const [firstItem, secondItem, thirdItem] = all;
            dayURL= firstItem.data;
            appointmentURL= secondItem.data;
            interviewerURL= thirdItem.data;
        dispatch({
            type: "setData",
            value: { dayURL, appointmentURL, interviewerURL }
          });
    
     
      //setting up websocket 
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };

      //On message from server, update state with interview
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

          dispatch({ type: "updateInterview", id: appointment.id, interview: appointment.interview});
        }
      }
    
    });
}, []);
      return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData
