import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/Home/HomeScreen";
import SignupScreen from "./components/Signup/SignupScreen";
import LoginScreen from "./components/Login/LoginScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/SignupScreen" element={<SignupScreen />} />
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
