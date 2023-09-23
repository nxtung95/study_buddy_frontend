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

export const updateContact = createAsyncThunk(
    "card/updateContact",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.updateContact(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const updateRegisterContact = createAsyncThunk(
    "card/updateRegisterContact",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.updateRegisterContact(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const updateStatus = createAsyncThunk(
    "card/updateStatus",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.updateStatus(data);
            return response.json();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: "An error occurred" });
        }
    }
);

export const updateSolution = createAsyncThunk(
    "card/updateSolution",
    async (data, thunkAPI) => {
        try {
            const response = await cardAPI.updateSolution(data);
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
        isLoadingViewCard: false,
        code: "",
        desc: "",
        detailCard: {}
    },
    reducers: {
        addAnswerCard: (state, action) => {
            state.detailCard.answers.unshift(action.payload);
        },
        updateCardContact: (state, action) => {
            const data = action.payload;
            if (data.type === 0) {
                state.detailCard.chatMessage = data.chatMessage;
            } else if (data.type === 2) {
                state.detailCard.voiceCall = data.voiceCall;
            } else if (data.type === 1) {
                state.detailCard.videoCall = data.videoCall;
            }
        },
        updateRegistCardContact: (state, action) => {
            const data = action.payload;
            if (data.type === 0) {
                state.detailCard.registChat = data.registChat;
            } else if (data.type === 2) {
                state.detailCard.registVoiceCall = data.registVoiceCall;
            } else if (data.type === 1) {
                state.detailCard.registVideoCall = data.registVideoCall;
            }
        },
        updateCardStatus: (state, action) => {
            state.detailCard.status = action.payload.status;
            state.detailCard.tutorName = action.payload.tutorName;
        },
        updateCardSolution: (state, action) => {
            state.detailCard.solutions = action.payload.solutions;
        },
    },
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
            if (action.payload.code === '00') {
                console.log("Detail Card: " + JSON.stringify(action.payload));
                state.detailCard = action.payload;
            }
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

        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });

        builder.addCase(updateRegisterContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });

        builder.addCase(updateStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });

        builder.addCase(updateSolution.fulfilled, (state, action) => {
            state.isLoading = false;
            state.desc = action.payload.desc;
            state.code = action.payload.code;
        });
    },
});
export const { addAnswerCard, updateCardContact, updateCardStatus, updateCardSolution, updateRegistCardContact } = cardSlice.actions;
export const { isLoading, code, desc, detailCard} = (state) => state.card;
export default cardSlice.reducer;