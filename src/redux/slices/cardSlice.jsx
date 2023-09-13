import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import questionAPI from "../../service/QuestionAPI";

export const addCard = createAsyncThunk(
    "card/addCard",
    async (data, thunkAPI) => {
        try {
            const response = await questionAPI.add(data);
            console.log("Response add question: " + JSON.stringify(response));
            return response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

const cardSlice = createSlice({
    name: "card",
    initialState: {
        isLoading: false,
        code: "",
        desc: "",
        cards: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
            if (action.payload.code === '00') {
                state.cards.push(action.payload.card);
            }
        });
        builder.addCase(addCard.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });
    },
});

export const { isLoading, code, desc, cards} = (state) => state.card;
export default cardSlice.reducer;