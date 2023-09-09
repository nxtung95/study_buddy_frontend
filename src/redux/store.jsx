import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import subjectReducer from "./slices/subjectSlice";

const rootReducer = combineReducers({
  user: userReducer,
  subject: subjectReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
