import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const initialState = {
  instructors: [],
    loading: true,
  status:'',
  getInstructorStatus: 'idel',
};

export const getInstructors = createAsyncThunk(
    'instructor/get',
    async (thunkAPI) => {
try {
       const res = await axios.get('/api/instructor');
        console.log(res.data)
        return res.data;
} catch (error) {
     const message = 
             (error.response && error.response.data && error.response.data.errors) ||
                error.message ||
                error.toString();
                console.log(message);

      return thunkAPI.rejectWithValue(message);
        
}
       
    }
)

export const addInstructor = createAsyncThunk(
    'instructor/add',
    async (formData, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        
        for (const entry of formData.entries()) {
            console.log('this is the form data: ', entry[0], entry[1])
        }
        
        try {
            const res = await axios.post('/api/instructor', formData, config);
            console.log(res.data)
            return res.data;

        } catch (error) {
            const message = 
             (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      console.log(message);

      return thunkAPI.rejectWithValue(message);
        }
    }
);

export const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        reset: (state) => {
          state.getInstructorStatus='idel'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addInstructor.pending, (state) => {
            state.status = 'pending'
            
        }).addCase(addInstructor.fulfilled, (state, action) => {
            state.status = 'success'
                
        }).addCase(addInstructor.rejected, (state) => {
            state.status = 'failed'
        }).addCase(getInstructors.pending, (state) => {
            // state.status = 'pending'
            state.loading = true
        }).addCase(getInstructors.fulfilled, (state, action) => {
            // state.status = 'success'
            state.instructors = action.payload
            state.loading= false
        }).addCase(getInstructors.rejected, (state) => {
            // state.status = 'failed'
            state.loading = false
        })
    }
});

export const { reset } = instructorSlice.actions;

export default instructorSlice.reducer;