import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import setAuthToken from '../src/utils/setAuthToken'
import axios from 'axios'
const initialState = {
    users: [],
    user: null,
    loading: true,
    error:null
  };

  
// export const loadUser = () => async (dispatch) => {
   
//     // if (localStorage.token) {
//     //   setAuthToken(localStorage.token);
//     // }
  
//     try {
//       const res = await axios.get('/api/auth/user');
//       // 
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     }
//   };

  
  export const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
          getUsers: (state, action) =>{
              state.users = action.payload,
              state.loading = false
          },
          addUser: (state, action)=>{
            state.users=[...state.users, action.payload],
            state.loading = false
          }
      },
      // extraReducers: (builder) => {
      //   builder
      //     .addCase(loadUser.pending, (state, action) => {
      //       state.loading = true 
      //     })
      //     // You can chain calls, or have separate `builder.addCase()` lines each time
      //     .addCase(loadUser.fulfilled, (state, action) => {
      //       state.loading = false;
      //       // 
      //       state.user = action.payload
      //     })
      //     // You can match a range of action types
      //     .addMatcher(
      //       loadUser.rejected,
      //       // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      //       (state, action) => {
      //           state.loading = false;
      //           // state.error= action.error.message
      //       }
      //     )
      // },
    //   extraReducers: {
    //       [loadUser.pending]: (state, action)=>{
    //           state.loading = true 
    //       },
    //       [loadUser.fulfilled]: (state, action)=>{
    //           state.loading = false;
    //           state.user = action.payload
    //       },
    //       [loadUser.rejected]: (state, action)=>{
    //           
    //           
    //         state.loading = false;
    //     }
    //   }
  });

  export const {getUsers, addUser} = userSlice.actions

  export default userSlice.reducer