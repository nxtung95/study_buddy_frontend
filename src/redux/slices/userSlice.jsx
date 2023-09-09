import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewStudent = createAsyncThunk(
  "user/addNewStudent",
  async (studentData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/student/add", {
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

export const login = createAsyncThunk(
  "user/login",
  async (studentData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/student/login", {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    subjects: [],
  },
  reducers: {
    signUpSuccess: (state) => {
      state.isLoading = false;
    },
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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

export const { signUpSuccess, signUpFailure, addSubject, deleteSubject } =
  userSlice.actions;

export default userSlice.reducer;
