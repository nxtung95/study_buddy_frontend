import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import subjectAPI from "../../service/SubjectAPI";

export const addNewSubject = createAsyncThunk(
  "subject/addSubject",
  async (data, thunkAPI) => {
    try {
      const response = await subjectAPI.add(data);

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "An error occurred" });
    }
  }
);

export const editSubject = createAsyncThunk(
    "subject/editSubject",
    async (data, thunkAPI) => {
      try {
        const response = await subjectAPI.edit(data);

        return response.json();
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: "An error occurred" });
      }
    }
);

export const deleteSubject = createAsyncThunk(
    "subject/deleteSubject",
    async (data, thunkAPI) => {
      try {
        const response = await subjectAPI.delete(data);

        return response.json();
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: "An error occurred" });
      }
    }
);

export const viewSubject = createAsyncThunk(
    "subject/viewSubject",
    async (data, thunkAPI) => {
      try {
        const response = await subjectAPI.view(data);

        return response.json();
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: "An error occurred" });
      }
    }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    isLoading: false,
    code: "",
    desc: "",
    subjects: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewSubject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewSubject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
      if (action.payload.code === '00') {
        state.subjects.push(action.payload.subject);
      }
    });
    builder.addCase(addNewSubject.rejected, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.error;
    });


    builder.addCase(deleteSubject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
      if (action.payload.code === '00') {
        const deletedSubject = action.payload.subject;
        const updatedSubjects = state.subjects.filter(
            (subject) => subject.id !== deletedSubject.id
        );
        state.subjects = updatedSubjects;
      }
    });
    builder.addCase(deleteSubject.rejected, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.error;
    });


    builder.addCase(editSubject.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editSubject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
      if (action.payload.code === '00') {
        const updateSubject = action.payload.subject;
        for (let i = 0; i < state.subjects.length; i++) {
          if (state.subjects[i].id === updateSubject.id) {
            state.subjects[i].title = updateSubject.title;
            break;
          }
        }
      }
    });

    builder.addCase(editSubject.rejected, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.error;
    });

    builder.addCase(viewSubject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
    });
  },
});

export const { isLoading, code, message, subjects} = (state) => state.subject;
export default subjectSlice.reducer;
