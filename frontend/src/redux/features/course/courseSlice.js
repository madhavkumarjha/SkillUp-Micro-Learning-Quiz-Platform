import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import courseAPI from "./courseAPI";

export const fetchAllCourses = createAsyncThunk(
  "course/fetchAllCourses",
  async (_, thunkAPI) => {
    try {
      const response = await courseAPI.getAllCourses();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    }
);

const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourses.pending, (state) => {  
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default courseSlice.reducer;

