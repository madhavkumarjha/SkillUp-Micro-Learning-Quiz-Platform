import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authAPI.login(userData);
      localStorage.setItem("token", response.token);

      // Immediately fetch user profile
      const user = await thunkAPI.dispatch(fetchMe()).unwrap();

      return { token: response.token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authAPI.register(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    return await authAPI.me();
  } catch (err) {
    thunkAPI.dispatch(logout());
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    user: null,
    error: null,
    initializing: true,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.initializing = false;
      localStorage.removeItem("token");
    },
    restoreSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.initializing = false;
    },
    finishInitialization: (state) => {
      state.initializing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.initializing = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initializing = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.initializing = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, restoreSession, finishInitialization } =
  authSlice.actions;
export default authSlice.reducer;
