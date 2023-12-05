import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux'
import axios from 'axios';
const initialState = {
    courses: [],
    course: null,
    loading: true,
    newCourseAdded: ''
  };

  export const getCourses = createAsyncThunk(
    "course/getall",
    async (course,thunkAPI) =>{
         
        try {
        const res = await axios.get('/api/courses');
          console.log(res.data)
        return res.data;
        
        
        } catch (error) {
          
          const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
          
               
             return thunkAPI.rejectWithValue(message)
            
        }
    }
  )
   //add course
 export const addCourse = createAsyncThunk(
    "course/add",
    async (course,thunkAPI) =>{
     // 
      const { courseName,
      courseCode,duration,
      price,online_url } = course;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ courseName,
        courseCode,
        price,duration,online_url });
        try {
        const res = await axios.post('/api/courses', body, config);
  
        return res.data;
        
        
        } catch (error) {
          
          const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
          
               
             return thunkAPI.rejectWithValue(message)
            
        }
    }
  )
  
    //update course
 export const updateCourse = createAsyncThunk(
  "course/update",
  async (course,thunkAPI) =>{
   
    const { id,courseName,
    courseCode,duration,
    price,online_url } = course;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ id,courseName,
      courseCode,
      price,duration,online_url });
      try {
      const res = await axios.put(`/api/courses`, body, config);

      return res.data;
      
      } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
        
             
           return thunkAPI.rejectWithValue(message)
          
      }
  }
)

  export const courseSlice = createSlice({
      name: 'course',
      initialState,
      reducers: {
        reset: (state)=>{
          state.newCourseAdded = ''
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(addCourse.pending, (state, action) => {
            state.loading = true;
            state.newCourseAdded = 'pending';

          })
          // You can chain calls, or have separate `builder.addCase()` lines each time
          .addCase(addCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = [...state.courses,action.payload]
            state.newCourseAdded = 'success';
           
          })
          // You can match a range of action types
          .addCase(
            addCourse.rejected,
            // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            (state, action) => {
                state.loading = false;
            state.newCourseAdded = '';

                // state.error= action.error.message
            }
          )
          .addCase(updateCourse.pending, (state, action) => {
            state.loading = true;
            state.newCourseAdded = 'pending';

          })
          // You can chain calls, or have separate `builder.addCase()` lines each time
          .addCase(updateCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = state.courses.map(course=> {
              if(course._id === action.payload._id) return action.payload;
              return course;
            })
            console.log('yessssss :',state.courses)
            state.newCourseAdded = 'success';
           
          })
          // You can match a range of action types  
          .addCase(
            updateCourse.rejected,
            // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            (state, action) => {
                state.loading = false;
            state.newCourseAdded = '';

                // state.error= action.error.message
            }
          )
          .addCase(getCourses.pending, (state, action) => {
            state.loading = true;

          })
          .addCase(getCourses.fulfilled, (state, action) => {
            
            state.loading = false;
            state.courses = action.payload;
                   
          })
          .addCase(
            getCourses.rejected,
            (state, action) => {
                state.loading = false;
            }
          )
      },
  });

  export const {reset} = courseSlice.actions

  export default courseSlice.reducer