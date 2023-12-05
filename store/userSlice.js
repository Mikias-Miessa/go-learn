import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import setAuthToken from '../src/utils/setAuthToken'
import axios from 'axios'
import { addClass } from './classSlice';
const initialState = {
    users: [],
    user: null,
    loading: true,
    error: null,
    updateUserStatus: '',
    newUserStatus: '',
    deleteUserStatus:'',
    getuser:'idel'
  };

  export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Make the API call using axios or any other HTTP library
      const response = await axios.get('/api/users');
      const allUsersData = response.data;
      console.log(allUsersData)
      // Return the data for all users
      return allUsersData;
    } catch (error) {
      // Handle errors and throw them to be captured by Redux Toolkit
      return rejectWithValue('Failed to fetch all users data');
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (user,thunkAPI) =>{
   
    const {id, Name, Phone, Email} = user;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ id, Name,
      Phone,
      Email
    });
 
      try {
      const res = await axios.put(`/api/users`, body, config);
   console.log(res.data)
      return res.data;
      
      } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
        
             
           return thunkAPI.rejectWithValue(message)
          
      }
  }
)
  //add course
 export const addUser = createAsyncThunk(
    "user/add",
    async (user,thunkAPI) =>{
     // 
      const { name, email, phone, role, password } = user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ name, email, phone, role, password });
      console.log(body)
        try {
        const res = await axios.post('/api/users/add', body, config);
  
        return res.data;
        
        
        } catch (error) {
          
          const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
          
               
             return thunkAPI.rejectWithValue(message)
            
        }
    }
)
 export const deleteUser = createAsyncThunk(
  'user/delete',
  async (deletedId, thunkAPI) => {
    const { userid } = deletedId;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/api/users?userid=${userid}`, config);
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errors) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
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
          // getUsers: (state, action) =>{
          //     state.users = action.payload,
          //     state.loading = false
          // },
          // addUser: (state, action)=>{
          //   state.users=[...state.users, action.payload],
          //   state.loading = false
        // }
         reset: (state) => {
          // state.users = [];
          state.updateUserStatus = ''
          state.newUserStatus = ''
          state.deleteUserStatus = ''
    },
    },
    extraReducers: (builder) => {
      builder.addCase(getUsers.pending, (state) => {
        // state.status = 'loading';
        state.loading = true
      })
        .addCase(getUsers.fulfilled, (state, action) => {
          // state.status = 'succeeded';
          state.loading = false
          state.users = action.payload;
        }).addCase(getUsers.rejected, (state, action) => {
          // state.status = 'failed';
          state.loading = false
          state.error = action.error.message;
        }).addCase(updateUser.pending, (state) => {
          state.loading = true
          state.updateUserStatus = 'pending'
        }).addCase(updateUser.fulfilled, (state, action) => {
          state.loading = false
          state.updateUserStatus = 'success'
          state.users = state.users.map(user => {
            if (user._id === action.payload._id) return action.payload;
            return user
          })
        }).addCase(updateUser.rejected, (state, action) => {
          state.loading = false
          state.updateUserStatus = 'failed'
          state.error = action.error
        }).addCase(addUser.pending, (state) => {
          state.loading = true
          state.newUserStatus = 'pending'
        }).addCase(addUser.fulfilled, (state, action) => {
          state.loading = false
          state.users = [...state.users, action.payload]
          state.newUserStatus = 'success' 
        }).addCase(addClass.rejected, (state, action) => {
          state.loading = false
          state.error = action.error
        }).addCase(deleteUser.pending, (state) => {
          state.loading = true
          state.deleteUserStatus = 'pending'
          state.getuser = 'pending'
        }).addCase(deleteUser.fulfilled, (state) => {
          state.loading = false
          state.deleteUserStatus = 'success'
          state.getuser = 'idel'
        }).addCase(deleteUser.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
      }
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

  export const { reset } = userSlice.actions 

  export default userSlice.reducer