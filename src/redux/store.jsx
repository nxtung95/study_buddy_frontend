import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import subjectReducer from "./slices/subjectSlice";
import cardReducer from "./slices/cardSlice";

const rootReducer = combineReducers({
  user: userReducer,
  subject: subjectReducer,
  card: cardReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
