import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cardAPI from "../../service/CardAPI";

export const addCard = createAsyncThunk(
    "card/addCard",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.add(data);
            console.log("Response add card: " + JSON.stringify(response));
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const viewCard = createAsyncThunk(
    "card/viewCard",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.view(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const updateCard = createAsyncThunk(
    "card/updateCard",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.update(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const deleteCard = createAsyncThunk(
    "card/deleteCard",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.delete(data);
            return response.json();
        } catch (error) {
            console.log(error);
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
        });
        builder.addCase(addCard.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });

        builder.addCase(viewCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(viewCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });
        builder.addCase(viewCard.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });

        builder.addCase(updateCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });
        builder.addCase(updateCard.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });

        builder.addCase(deleteCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });
        builder.addCase(deleteCard.rejected, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.error;
        });
    },
});

export const { isLoading, code, desc, cards} = (state) => state.card;
export default cardSlice.reducer;