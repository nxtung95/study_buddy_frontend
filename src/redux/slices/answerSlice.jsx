import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import answerAPI from "../../service/AnswerAPI";

export const addAnswer = createAsyncThunk(
    "answer/addAnswer",
    async (data, thunkAPI) => {
        try {
            const response = await answerAPI.add(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

const answerSlice = createSlice({
    name: "answer",
    initialState: {
        isLoading: false,
        code: "",
        desc: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAnswer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addAnswer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });
        builder.addCase(addAnswer.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });
    },
});
export const { isLoading, code, desc} = (state) => state.answer;
export default answerSlice.reducer;