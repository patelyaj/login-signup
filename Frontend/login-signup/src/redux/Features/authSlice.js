import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/users/login', userData,{withCredentials:true});  

      console.log('login',data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
      
    } catch (err) {
      // return rejectWithValue(err.response?.data?.message || 'Login failed');
      return rejectWithValue('Login failed',err);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("thunk called");
      const { data } = await axios.post('http://localhost:5000/users/signup', userData,{withCredentials:true});
      console.log("regis",data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      return data;
    } catch (err) {
      // return rejectWithValue(err.response?.data?.message || 'Signup failed');
      return rejectWithValue('Signup failed',err);
    }
  }
);

// mainn
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage, // Initialize from LocalStorage
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Non-async reducers
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.user = null;
      state.success = false;
      state.error = null;
    },

    // resetError: (state) => {
    //   state.error = null;
    // }
  },

  extraReducers: (builder) => {
    builder
      // --- Login Handlers ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      })
      // --- Register Handlers ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;