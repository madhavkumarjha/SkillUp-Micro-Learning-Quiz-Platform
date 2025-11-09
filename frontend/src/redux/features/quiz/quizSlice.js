import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import quizAPI from "./quizAPI";

export const fetchAllQuizzes = createAsyncThunk(
  "quizzes/fetchAllQuizzes",
  async (_, thunkAPI) => {
    try {
      const response = await quizAPI.getAllQuizzes();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    }
);

const quizSlice = createSlice({
    name: "quizzes",
    initialState: {
        quizzess: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuizzes.pending, (state) => {  
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzess = action.payload;
            })
            .addCase(fetchAllQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default quizSlice.reducer;

