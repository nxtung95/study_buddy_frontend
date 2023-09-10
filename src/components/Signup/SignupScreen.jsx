import React from "react";
import Appbar from "./AppBar";
import User from "./User";
import { colors } from "../Styles/theme";

function SignupScreen() {
  return (
    <div style={{ backgroundColor: colors.primaryBackground }}>
      <header></header>
      <Appbar />
      <User />
    </div>
  );
}

export default SignupScreen;
