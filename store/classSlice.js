import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const initialState = {
  classes: [],
  runningClasses: [],
  closedClasses: [],
  singleClass: null,
  loading: true,
  newClassAdded: '',
  status: '',
  classDeleted:'',
};

export const getClasses = createAsyncThunk(
  'classroom/getall',
  async (classValues, thunkAPI) => {
    try {
      const res = await axios.get('/api/classes/all');

      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getRunningClassesAd = createAsyncThunk(
  'classroom/getRunningAd',
  async (classValues, thunkAPI) => {
    try {
      const res = await axios.get('/api/classes/running-ad');

      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getRunningClasses = createAsyncThunk(
  'classroom/getRunning',
  async (classValues, thunkAPI) => {
    try {
      const res = await axios.get('/api/classes/running');

      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getClosedClasses = createAsyncThunk(
  'classroom/getClosed',
  async (classValues, thunkAPI) => {
    try {
      const res = await axios.get('/api/classes/closed');

      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClass = createAsyncThunk(
  'classroom/getclass',
  async (slug, thunkAPI) => {
    try {
      const res = await axios.get(`/api/classes/${slug}`);

      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add class
export const addClass = createAsyncThunk(
  'classroom/add',
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
      const res = await axios.post('/api/classes', formData, config);
      console.log(res.data);
      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      // console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete class 
export const deleteClass = createAsyncThunk(
  'classroom/delete',
  async (deletedClass, thunkAPI) => {
    const id = deletedClass._id;
    console.log('console log from the slice: '+id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/api/classes?id=${id}`, config)
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errors) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
      
    }
  }
)
//enroll student
export const enrollStudent = createAsyncThunk(
  'student/enroll',
  async (student, thunkAPI) => {
    // 
    const {
      course,
      name,
      email,
      phone,
      bank,
      payment_with,
      reference,
      amount,
    } = student;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      course,
      name,
      email,
      phone,
      bank,
      payment_with,
      reference,
      amount,
    });
    try {
      const res = await axios.post('/api/students/enroll', body, config);
      // 
      return res.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const classSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    reset: (state) => {
      (state.newClassAdded = ''), (state.status = '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClass.pending, (state, action) => {
        state.loading = true;
        state.newClassAdded = 'pending';
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = [...state.classes, action.payload];
        state.newClassAdded = 'success';
      }).addCase(addClass.rejected, (state) => {
        state.newClassAdded = 'failed'
        state.loading = false
      }).addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.classDeleted = 'pending'
      }).addCase(deleteClass.fulfilled, (state) => {
        state.loading = false;
        state.classDeleted = 'succes'
      }).addCase(deleteClass.rejected, (state) => {
        state.loading = false;
        state.classDeleted = 'failed'
      })
      .addCase(getClasses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        // 
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getRunningClassesAd.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRunningClassesAd.fulfilled, (state, action) => {
        // 
        state.loading = false;
        state.runningClasses = action.payload;
      })
      .addCase(getRunningClassesAd.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getRunningClasses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRunningClasses.fulfilled, (state, action) => {
        // 
        state.loading = false;
        state.runningClasses = action.payload;
      })
      .addCase(getRunningClasses.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getClosedClasses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClosedClasses.fulfilled, (state, action) => {
        // 
        state.loading = false;
        state.closedClasses = action.payload;
      })
      .addCase(getClosedClasses.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getClass.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClass.fulfilled, (state, action) => {
        state.loading = false;
        state.singleClass = action.payload;
      })
      .addCase(getClass.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(enrollStudent.pending, (state, action) => {
        state.loading = true;
        state.status = 'enrolling';
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.singleClass = action.payload;
        state.status = 'enrolled';
      })
      .addCase(enrollStudent.rejected, (state, action) => {
        state.loading = false;
        state.status = '';
      });
  },
});

export const { reset } = classSlice.actions;

export default classSlice.reducer;
