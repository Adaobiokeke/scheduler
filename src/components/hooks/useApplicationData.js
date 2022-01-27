import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducers/application.js";
import actionTypes from "../Actions/types"
import {fetchData} from '../Actions/index'


export default function useApplicationData(props) {
  const { 
    SET_DAY,
    SET_INTERVIEW
  } = actionTypes

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, payload: day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/api/days"),
      axios.get("http://localhost:8080/api/appointments"),
      axios.get("http://localhost:8080/api/interviewers")
    ]).then(all => {
      dispatch(fetchData(all));
    });
  }, []);

  const bookInterview = (id, interview) =>{
    return axios.put(`http://localhost:8080/api/appointments/${id}`, { interview }).then(res =>{
      dispatch({
       type: SET_INTERVIEW,
       payload: {
         id,
        interview
       }
     })
     return res
    }
    );
  }

 const cancelInterview =(id) =>{
     return axios.delete(`http://localhost:8080/api/appointments/${id}`).then(res =>{
     dispatch({
        type: SET_INTERVIEW,
        payload:{ 
          id,
          interview: null
        }
      })
      return res
    }
     )
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    dispatch
  };
}