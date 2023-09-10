import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userAPI from "../../service/UserAPI";

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await userAPI.register(data);
      // if (!response.ok) {
      //   // Handle error scenario
      //   const errorData = await response.json();
      //   return thunkAPI.rejectWithValue(errorData.data);
      // }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "An error occurred" });
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await userAPI.login(data);

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

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    code: "",
    desc: "",
    subjects: [],
    currentUser: {}
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
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.error;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.desc = action.payload.desc;
      state.code = action.payload.code;
      if (action.payload.code === '00') {
        localStorage.setItem("access_token", action.payload.accessToken);
        state.currentUser = action.payload.user;
      }
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.desc = action.payload.error;
    });
  },
});

export const { addSubject, deleteSubject } = userSlice.actions;
export const { isLoading, code, message, subjects, currentUser} = (state) => state.user;
export default userSlice.reducer;
