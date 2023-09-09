import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewSubject = createAsyncThunk(
  "subject/addSubject",
  async (studentData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/subject/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        // Handle error scenario
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "An error occurred" });
    }
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
  },
  reducers: {
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    deleteSubject: (state, action) => {
      const subjectToDelete = action.payload;
      const updatedSubjects = state.subjects.filter(
        (subject) => subject !== subjectToDelete
      );
      state.subjects = updatedSubjects;
    },
  },
});

export const { addSubject, deleteSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
