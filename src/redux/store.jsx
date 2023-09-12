import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import subjectReducer from "./slices/subjectSlice";
import questionReducer from "./slices/questionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  subject: subjectReducer,
  question: questionReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
