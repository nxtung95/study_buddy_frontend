import { colors, fonts } from "../Styles/theme";
import React from "react";
import Typography from "@mui/material/Typography";
import SideBar from "../common/sideBar";
import Board from "../common/board";

const styles = {
  container: {
    backgroundColor: colors.HomeScreenBackground,
    minHeight: "100vh",
    paddingTop: "1px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    ...fonts.primaryFontBold,
    paddingTop: "16px",
    paddingLeft: "32px",
  },
};

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      <Typography style={styles.title}>StudyBuddy</Typography>
      <div style={styles.content}>
        <SideBar />
        <Board />
      </div>
    </div>
  );
};

export default HomeScreen;
