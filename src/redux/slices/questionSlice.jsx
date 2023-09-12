import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import questionAPI from "../../service/QuestionAPI";

export const addQuestion = createAsyncThunk(
    "subject/addQuestion",
    async (data, thunkAPI) => {
        try {
            const response = await questionAPI.add(data);

            return response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

const questionSlice = createSlice({
    name: "question",
    initialState: {
        isLoading: false,
        code: "",
        desc: "",
        questions: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addQuestion.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
            if (action.payload.code === '00') {
                state.questions.push(action.payload.question);
            }
        });
        builder.addCase(addQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });
    },
});

export const { isLoading, code, message, question} = (state) => state.question;
export default questionSlice.reducer;