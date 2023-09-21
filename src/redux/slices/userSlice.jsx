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

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "An error occurred" });
    }
  }
);

// export const findTutor = createAsyncThunk(
//     "user/findTutor",
//     async (thunkAPI) => {
//       try {
//         const response = await userAPI.findTutor();

//         return response.json();
//       } catch (error) {
//         return thunkAPI.rejectWithValue({ error: "An error occurred" });
//       }
//     }
// );

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    code: "",
    desc: "",
    currentUser: {
      subjects: []
    },
    tutors: []
  },
  reducers: {
    addUserSubject: (state, action) => {
      state.currentUser.subjects.unshift(action.payload);
    },
    editUserSubject: (state, action) => {
      const updateSubject = action.payload;
      for (let i = 0; i < state.currentUser.subjects.length; i++) {
        if (state.currentUser.subjects[i].id === updateSubject.id) {
          state.currentUser.subjects[i].title = updateSubject.title;
          break;
        }
      }
    },
    deleteUserSubject: (state, action) => {
      const subjectToDelete = action.payload;
      const updatedSubjects = state.currentUser.subjects.filter(
        (subject) => subject.id !== subjectToDelete.id
      );
      state.currentUser.subjects = updatedSubjects;
    },

    addUserSubjectQuestion: (state, action) => {
      const card = action.payload;
      for (let i = 0; i < state.currentUser.subjects.length; i++) {
        const subject = state.currentUser.subjects[i];
        if (subject.id === card.subjectId) {
          subject.questions.unshift(card);
          break;
        }
      }
    },

    deleteUserSubjectQuestion: (state, action) => {
      const card = action.payload;
      for (let i = 0; i < state.currentUser.subjects.length; i++) {
        const subject = state.currentUser.subjects[i];
        if (subject.id === card.subjectId) {
          const updateQuestions = subject.questions.filter(
              (question) => question.id !== card.id
          );
          subject.questions = updateQuestions;
          break;
        }
      }
    },

    changeStatusQuestion: (state, action) => {
      const card = action.payload;
      const subjects = state.currentUser.subjects;
      for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        for (let j = 0; j < subject.questions.length; j++) {
          if (subject.questions[j].id === card.questionId) {
            subject.questions[j].status = card.status;
            break;
          }
        }
      }
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

    // builder.addCase(findTutor.fulfilled, (state, action) => {
    //   state.desc = action.payload.desc;
    //   state.code = action.payload.code;
    //   if (action.payload.code === '00') {
    //     state.tutors = action.payload.tutors;
    //   }
    // });
  },
});

export const { addUserSubject, editUserSubject, deleteUserSubject, addUserSubjectQuestion, deleteUserSubjectQuestion, changeStatusQuestion } = userSlice.actions;
export const { isLoading, code, message, currentUser, tutors} = (state) => state.user;
export default userSlice.reducer;
