import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import setAuthToken from '../src/utils/setAuthToken'
import axios from 'axios';
import {useRouter} from 'next/router'

const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token'): null,
    isAuthenticated: false,
    isSuccess: false,
    loading: true,
    user: null,
    dashboard: null,
    error: null,
    status: ''
  };

  //Load User
  export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (dispatch, getState) =>{
const router = useRouter();

        setAuthToken(localStorage.token);
        try {
            // 
        const res = await axios.get('http://localhost:3000/api/auth/user');
        
        window.location.href = 'http://localhost:3000/admin/dashboard'
        return res.data
        } catch (err) {
            
        }
        
    }
)

 //Loign User
 export const login = createAsyncThunk(
  "auth/login",
  async (user,thunkAPI) =>{
    // 
    const { email, password } = user;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
      try {
      const res = await axios.post('/api/auth/login', body, config);

      if(res.data){

        localStorage.setItem('token', res.data.token);
      }
      if (res !== undefined) {
           return res.data
      }
      
      } catch (error) {
        
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
        
             
           return thunkAPI.rejectWithValue(message)
          
      }
      
  }
)

  
  export const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
          logout: (state, action)=>{
           
            state.token= null,
            state.isAuthenticated= false,
            state.user= null,
            state.loading = false
          },
          reset: (state)=>{
            state.isSuccess= false,
            state.error= null,
            state.loading = true;
            state.status=''
          }
      },
      extraReducers: (builder) => {
        builder
          .addCase(loadUser.pending, (state, action) => {
            state.loading = true 
          })
          // You can chain calls, or have separate `builder.addCase()` lines each time
          .addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            
            state.auth = action.payload
            state.isAuthenticated = true;
          })
          // You can match a range of action types
          .addCase(
            loadUser.rejected,
            // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            (state, action) => {
                state.loading = false;
                // state.error= action.error.message
            }
          )
          .addCase(login.pending, (state, action) => {
            state.loading = true 
            state.status='pending';
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            
            state.user = action.payload.user
            state.isAuthenticated = true;
            state.status='';

          })
          .addCase(
            login.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            state.status='error';

            }
          )
      },

  });

  export const { logout,reset} = authSlice.actions

  export default authSlice.reducer