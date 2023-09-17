import {colors, fonts} from "../Styles/theme";
import React from "react";
import Typography from "@mui/material/Typography";
import SideBar from "../common/sideBar";
import Board from "../common/board";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    e.preventDefault();

    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
    }

    navigate("/");
  }

  return (
      <React.Fragment>
        <div style={{...styles.container, opacity: isLoading ? '0.5' : '1'}}>
          <div style={{...styles.container}}>
            <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '98%'}}>
              <Typography style={styles.title}>StudyBuddy</Typography>
              <IconButton onClick={handleLogout}>
                <LogoutOutlinedIcon fontSize="large" style={styles.title}></LogoutOutlinedIcon>
              </IconButton>
            </Box>
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
