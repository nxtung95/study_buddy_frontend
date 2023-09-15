import {colors, fonts} from "../Styles/theme";
import React from "react";
import Typography from "@mui/material/Typography";
import SideBar from "../common/sideBar";
import Board from "../common/board";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
  const isLoading = useSelector(state => state.card.isLoading);
  return (
      <React.Fragment>
        <div style={{...styles.container, opacity: isLoading ? '0.5' : '1'}}>
          <div style={{...styles.container}}>
            <Typography style={styles.title}>StudyBuddy</Typography>
            <div style={styles.content}>
              <SideBar />
              <Board/>
            </div>
          </div>
        </div>
        <Box sx={{display: 'flex', position: 'fixed', left: '50%', top: '40%', opacity: '1'}} visibility={isLoading ? 'visible' : 'hidden'}>
          <CircularProgress />
        </Box>
      </React.Fragment>
  );
};

export default HomeScreen;
