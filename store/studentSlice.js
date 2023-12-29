import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const initialState = {
  students: [],
  student: null,
  loading: true,
  status: '',
};

export const getStudents = createAsyncThunk(
  'student/getall',
  async (student, thunkAPI) => {
    try {
      const res = await axios.get('/api/students');

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
export const getRegisteredStudents = createAsyncThunk(
  'student/registered',
  async (student, thunkAPI) => {
    try {
      const res = await axios.get('/api/students/registered');

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
//add student
export const addStudent = createAsyncThunk(
  'student/add',
  async (student, thunkAPI) => {
    const { course, name, email, phone, bank, remark, contacted, schedule } = student;
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
      remark,
      schedule,
      contacted,
    });
    try {
      const res = await axios.post('/api/students/register', body, config);

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

//mark student as contacted with/out remark
export const markAsContacted = createAsyncThunk(
  'student/contacted',
  async (student, thunkAPI) => {
    const { id, remark } = student;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ remark });

    try {
      const res = await axios.put(
        `/api/students/contacted/${id}`,
        body,
        config
      );

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
//enroll registered student
export const enrollRegisteredStudent = createAsyncThunk(
  'student/enrollregistered',
  async (student, thunkAPI) => {
    const { id, remark, payment_with, reference, amount, course } = student;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      remark,
      payment_with,
      reference,
      amount,
      course,
    });

    try {
      const res = await axios.put(
        `/api/students/enroll/registered/${id}`,
        body,
        config
      );

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

//add payment reference
export const addPaymentReference = createAsyncThunk(
  'student/addreference',
  async (student, thunkAPI) => {
    const { id, reference, amount } = student;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ reference, amount });

    try {
      const res = await axios.put(
        `/api/students/enroll/payments/${id}`,
        body,
        config
      );

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

//delete student
export const deleteStudent = createAsyncThunk(
  'student/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/students/${id}`);

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
export const saveCertificate = createAsyncThunk(
  'student/saveCertificate',
  async (data, thunkAPI) => {
    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();

      // Append the PDF file to the FormData
      // formData.append('pdf', data.pdf);
      formData.append('image', data.pdf);

      // Append other data to the FormData
      formData.append('date', data.date);
      formData.append('shareLink', data.shareLink);
      formData.append('name', data.stname);
      formData.append('course', data.course);
      formData.append('certificateId', data.certificateId)

       for (const entry of formData.entries()) {
      console.log('this is the form data: ', entry[0], entry[1])
    } 
      // Make the POST request using Axios
      const response = await axios.post('/api/certificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
        },
      });

      // Log the response or handle it as needed
      console.log(response.data);

      // Return any data you want to include in the Redux store
      return response.data;
    } catch (error) {
      // Handle errors or dispatch actions accordingly
      console.error('Error saving certificate:', error);
      throw error; // Propagate the error to be handled by the calling code
    }
  }
);

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state, action) => {
        state.loading = true;
        state.status = 'pending';
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [...state.students, action.payload];
        state.status = 'success';
      })
      // You can match a range of action types
      .addCase(
        addStudent.rejected,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          state.loading = false;
          state.status = '';

          // state.error= action.error.message
        }
      )
      .addCase(markAsContacted.pending, (state, action) => {
        state.loading = true;
        state.status = 'pending';
      })
      .addCase(markAsContacted.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id
        );
        state.status = 'contacted';
      })
      .addCase(markAsContacted.rejected, (state, action) => {
        state.loading = false;
        state.status = '';
      })
      .addCase(enrollRegisteredStudent.pending, (state, action) => {
        state.loading = true;
        state.status = 'pending';
      })
      .addCase(enrollRegisteredStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id
        );
        state.status = 'enrolled';
      })
      .addCase(enrollRegisteredStudent.rejected, (state, action) => {
        state.loading = false;
        state.status = '';
      })
      .addCase(addPaymentReference.pending, (state, action) => {
        state.loading = true;
        state.status = 'pending';
      })
      .addCase(addPaymentReference.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id
        );
        state.status = 'added';
      })
      .addCase(addPaymentReference.rejected, (state, action) => {
        state.loading = false;
        state.status = '';
      })
      .addCase(deleteStudent.pending, (state, action) => {
        state.loading = true;
        state.status = 'deleting';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload.id
        );
        state.status = 'deleted';
      })
      .addCase(
        deleteStudent.rejected,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          state.loading = false;
          state.status = '';

          // state.error= action.error.message
        }
      )
      .addCase(getStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getRegisteredStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRegisteredStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getRegisteredStudents.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = studentSlice.actions;

export default studentSlice.reducer;
