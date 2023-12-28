import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const initialState = {
        
}

export const saveCertificate = createAsyncThunk(
    'certificate/saveCertificate',
    async (formData, thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        for (const entry of formData.entries()) {
            console.log('this is the form data: ', entry[0], entry[1])
        }
    
        try {
          const res = await axios.post('/api/certificate', formData, config);
          console.log(res.data);
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

export const certificateSlice = createSlice({
    name: 'certificate',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }

})

export default certificateSlice.reducer;