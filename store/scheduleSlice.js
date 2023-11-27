import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import axios from 'axios';

const initialState = {
    schedules: [],
    schedule: null,
    loading: true,
    scheduleDeleted: '',
    newScheduleAdded: ''
};

export const getSchedules = createAsyncThunk(
    "schedule/getall",
    async (schedule, thunkAPI) => {
        try {
            const res = await axios.get('/api/schedules');
            return res.data;
        } catch (error) {
            
            const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
            

            return thunkAPI.rejectWithValue(message)

        }
    }
)

// add schedule
export const addSchedule = createAsyncThunk(
    "schedule/add",
    async (schedule, thunkAPI) => {
        const { days,
            startHour, endHour,
         } = schedule;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({
            days,
            startHour,
            endHour
        });
        try {
            const res = await axios.post('/api/schedules', body, config);
            return res.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)

        }
    }
)

//schedule
export const deleteSchedule = createAsyncThunk(
    "schedule/delete",
    async (schedule, thunkAPI) => {
        const { id } = schedule;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                id
            }
        };
        try {
            const res = await axios.delete(`/api/schedules`, config);
            return res.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        reset: (state) => {
            state.scheduleDeleted = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteSchedule.pending, (state, action) => {
                state.loading = true;
                state.scheduleDeleted = 'pending';
            })

            .addCase(addSchedule.pending, (state, action) => {
                state.loading = true;
                state.newScheduleAdded = 'pending';  
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(addSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.schedules = [...state.schedules, action.payload]
                state.newScheduleAdded = 'success'
            })

            .addCase(deleteSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.scheduleDeleted = 'success'
                // remove schedule from the state
                state.schedules = state.schedules.filter(schedule => schedule._id !== action.payload);
            })

            // You can match a range of action types
            .addCase(
                addSchedule.rejected,
                // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
                (state, action) => {
                    state.loading = false;
                    state.scheduleDeleted = '';

                    // state.error= action.error.message
                }
            )
            
            .addCase(getSchedules.pending, (state, action) => {
                state.loading = true;

            })

            .addCase(getSchedules.fulfilled, (state, action) => {
                state.loading = false;
                state.schedules = action.payload;
            })

            .addCase(
                getSchedules.rejected,
                (state, action) => {
                    state.loading = false;
                }
            )
    },
});

export const { reset } = scheduleSlice.actions

export default scheduleSlice.reducer