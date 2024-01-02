import {  applyMiddleware } from "redux";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import user from './userSlice';
import course from './courseSlice';
import auth from './authSlice';
import classroom from './classSlice';
import student from './studentSlice';
import schedule from "./scheduleSlice"
import instructor from "./instructorSlice";

// initial states here
const initalState = {};

const combinedReducer = combineReducers({
  auth,user,course,classroom,student,schedule,instructor
})

const masterReducer = (state, action)=>{
  if(action.type === HYDRATE){
    const nextState = {
      ...state,
      users:[...action.payload.user.users, ...state.user.users],
      // instructors:[...action.payload.user.users, ...state.user.users],
      courses:[...action.payload.course.courses, ...state.course.courses],
      classes:[...action.payload.classroom.classes, ...state.classroom.classes],
      students: [...action.payload.student.students, ...state.student.students],
      instructors:[...action.payload.instructor.instructors, ...state.instructor.instructors],
      schedules: [...action.payload.schedule.schedules, ...state.schedule.schedules]
    }
    return nextState;
  }else {
    return combinedReducer(state, action)
  }
}

// assigning store to next wrapper
export const store = () => configureStore({
  reducer: masterReducer,
  devTools:  process.env.NODE_ENV !== 'production',
  // preloadedState
});

export const wrapper = createWrapper(store);