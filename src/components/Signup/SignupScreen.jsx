import React from "react";
import Appbar from "./AppBar";
import Student from "./Student";
import { colors } from "../Styles/theme";

function SignupScreen() {
  return (
    <div style={{ backgroundColor: colors.primaryBackground }}>
      <header></header>
      <Appbar />
      <Student />
    </div>
  );
}

export default SignupScreen;
