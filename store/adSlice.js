import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import setAuthToken from '../src/utils/setAuthToken'
import axios from 'axios'

const initialState = {
    loading: true,
    ads:[],
}
export const getAds = createAsyncThunk(
    'ads/getAds',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/ad')
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch ads ');
        }
    }
);
export const addAds = createAsyncThunk(
    'ads/add', 
    async (data, thunkAPI) => {

        try {
             const { title, description, link, status } = data
           const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        };
        const body = JSON.stringify({ title, description, link, status });

        const res = await axios.post('/api/ad/', body, config);
  
        return res.data;
        } catch (error) {
             const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
          
               
             return thunkAPI.rejectWithValue(message)
        }

       

    }
    
)