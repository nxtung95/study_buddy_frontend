import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import subjectAPI from "../../service/SubjectAPI";

export const addNewSubject = createAsyncThunk(
  "subject/addSubject",
  async (data, thunkAPI) => {
    try {
      const response = await subjectAPI.add(data);

      // if (!response.ok) {
      //   // Handle error scenario
      //   const errorData = await response.json();
      //   return thunkAPI.rejectWithValue(errorData);
      // }
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

        // if (!response.ok) {
        //   // Handle error scenario
        //   const errorData = await response.json();
        //   return thunkAPI.rejectWithValue(errorData);
        // }
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
      if (action.payload.code == '00') {
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
      if (action.payload.code == '00') {
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
  },
});

export const { isLoading, code, message, subjects} = (state) => state.subject;
export default subjectSlice.reducer;
