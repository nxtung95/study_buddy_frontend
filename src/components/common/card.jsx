import React, {useState} from "react";
import {fonts} from "../Styles/theme";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Typography from "@material-ui/core/Typography";
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';

const CardView = ({ question, subject }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const styles = {
    cardContainer: {
      backgroundColor: isHovering ? "#E6F1FA" : "#FFFFFF",
      cursor: isHovering ? "pointer" : "auto",
      borderRadius: "10px",
      padding: "10px",
      marginBottom: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "relative"
    },

    answeredPill: {
      position: "absolute",
      top: "10px", // Place the pill above the title
      left: "11%",
      width: "50px",
      height: "10px",
      borderRadius: "10px",
      backgroundColor: "#04E49C",
      transform: "translateX(-50%)",
      content: "",
    },
    notAnsweredPill: {
      position: "absolute",
      top: "10px", // Place the pill above the title
      left: "11%",
      width: "50px",
      height: "10px",
      borderRadius: "10px",
      backgroundColor: "#FF4F4F",
      transform: "translateX(-50%)",
      content: "",
    },
    cardTitle: {
      ...fonts.subjectCardNormal,
      margin: "20px 0 5px", // Add more margin between the pill and title
    },
    cardContent: {
      fontSize: "16px",
      color: "#000000",
      margin: 0,
    },
    answeredByText: {
      ...fonts.subjectCardItalics,
      paddingTop: "15px",
      margin: "5px 0 0",
      textAlign: "right",
    },
  };

  const viewStyles = {
    cardTitle: {
      ...fonts.subjectCardNormal,
      fontSize: "25px",
      fontWeight: 400,
      marginBottom: 0
    },
    subCardTitle: {
      ...fonts.subjectCardNormal,
      fontSize: "15px",
      fontWeight: 200,
      color: "gray"
    },
    description: {
      ...fonts.subjectCardNormal,
      fontSize: "20px",
      fontWeight: 300
    },
  }

  const openAddQuestionDialog = () => {
    setOpenQuestionForm(!openQuestionForm);
    // dispatch(findTutor())
    //     .unwrap()
    //     .then((result) => {
    //       if (commonUtility.isSuccess(result.code)) {
    //       } else {
    //         console.log("Find tutor has failed");
    //       }
    //     })
    //     .catch(() => {
    //       console.log("Find tutor has failed");
    //     });
  }

  const closeAddQuestionDialog = () => {
    setOpenQuestionForm(false);
  };

  return (
      <React.Fragment>
        <div
            style={styles.cardContainer}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={openAddQuestionDialog}
        >
          {/* Pill indicating answered status */}
          <div style={question.status === 1 ? styles.answeredPill : styles.notAnsweredPill}></div>

          {/* Title */}
          <h3 style={styles.cardTitle}>{question.title}</h3>

          {/* <p style={styles.cardContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        ligula ac eros tincidunt, eget iaculis mauris porttitor.
      </p> */}

          {/* Answered by text */}
          {
            question.status === 1 && (
                <p style={styles.answeredByText}>Answered by: John Doe</p>
            )
          }
        </div>

        {openQuestionForm && (
            <Dialog open={openQuestionForm} onClose={closeAddQuestionDialog} maxWidth="md">
              <DialogTitle>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <ArticleOutlinedIcon fontSize="large"></ArticleOutlinedIcon>
                  </Grid>
                  <Grid item xs={11} >
                    <Grid item xs={12}>
                      <div style={viewStyles.cardTitle}>{question.title}</div>
                    </Grid>
                    <Grid item xs={12}><Typography style={viewStyles.subCardTitle}>in list {subject.title}</Typography></Grid>
                  </Grid>

                  {/*<Grid item xs={1}></Grid>*/}
                  {/*<Grid item xs={11}>*/}
                  {/*  <Card sx={{ minWidth: 100 }}>*/}
                  {/*    <CardContent>*/}
                  {/*      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                  {/*        Word of the Day*/}
                  {/*      </Typography>*/}
                  {/*    </CardContent>*/}
                  {/*  </Card>*/}
                  {/*</Grid>*/}

                </Grid>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <DensitySmallOutlinedIcon fontSize="large"></DensitySmallOutlinedIcon>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={viewStyles.description}>Description</div>
                  </Grid>
                  <Grid item xs={9} alignItems="center">
                    <Button>Edit</Button>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <TextareaAutosize
                        minRows={20}
                        style={{width: "700px"}}
                        defaultValue={question.inputText}
                        // onChange={handleInputTextChange}
                    >
                    </TextareaAutosize>
                  </Grid>

                  <Grid item xs={1}>
                    <ChatOutlinedIcon fontSize="large"></ChatOutlinedIcon>
                  </Grid>
                  <Grid item xs={9}>
                    <div style={viewStyles.description}>Activity</div>
                  </Grid>
                  <Grid item xs={2} alignItems="center">
                    <Button>Hide Details</Button>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <TextareaAutosize
                        minRows={3}
                        style={{width: "700px"}}
                        placeholder="Write a comment..."
                        // onChange={handleInputTextChange}
                    >
                    </TextareaAutosize>
                  </Grid>

                  <Grid item xs={1}>
                    <PersonOutlineOutlinedIcon fontSize="large"></PersonOutlineOutlinedIcon>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid item xs={12}>
                      <div><b>Max Tan</b> solved the question <a href="#">view here</a></div>
                    </Grid>
                    <Grid item xs={12}>29 minutes ago</Grid>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <MicIcon fontSize="large"></MicIcon>
                    <VideocamIcon fontSize="large"></VideocamIcon>
                    <ChatIcon fontSize="large"></ChatIcon>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeAddQuestionDialog}>Close</Button>
              </DialogActions>
            </Dialog>
        )}
      </React.Fragment>
  );
};

export default CardView;
