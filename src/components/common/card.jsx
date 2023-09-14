import React, {useState} from "react";
import {fonts} from "../Styles/theme";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Typography
} from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ImageUploadCard from "./uploadImage";
import {useDispatch, useSelector} from "react-redux";
import commonUtility from "../../utility/CommonUtility";
import {deleteCard, updateCard, viewCard} from "../../redux/slices/cardSlice";
import {deleteUserSubjectQuestion} from "../../redux/slices/userSlice";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CardView = ({ question, subject }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const [isHovering, setIsHovering] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [detailCard, setDetailCard] = useState({});
  const [inputText, setInputText] = useState("");
  const [formCardErrors, setFormCardErrors] = useState({});
  const [fileSelectedList, setFileSelectedList] = useState([]);
  const [isUpdateCard, setIsUpdateCard] = useState(false);
  const [updateCardFail, setUpdateCardFail] = useState(false);
  const descUpdateCard = useSelector(state => state.card.desc);

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
    cardInfoTitle: {
      ...fonts.subjectCardNormal,
      fontSize: "15px",
      fontWeight: 700
    },
    answeredPill: {
      // top: "10px", // Place the pill above the title
      // left: "11%",
      width: "50px",
      height: "20px",
      borderRadius: "10px",
      backgroundColor: "#04E49C",
      content: "",
    },
    notAnsweredPill: {
      // top: "10px", // Place the pill above the title
      // left: "11%",
      width: "50px",
      height: "20px",
      borderRadius: "10px",
      backgroundColor: "#FF4F4F",
      content: "",
    },
    description: {
      ...fonts.subjectCardNormal,
      fontSize: "20px",
      fontWeight: 300
    },
  }

  const openAddQuestionDialog = () => {
    const data = {
      "subjectId": subject.id,
      "questionId": question.id
    }
    dispatch(viewCard(data))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setDetailCard(result);
            setFileSelectedList(result.images);
            setOpenQuestionForm(!openQuestionForm);
          } else {
            console.log("View card has failed");
          }
        })
        .catch(() => {
          console.log("View card has failed");
        });
  }

  const closeAddQuestionDialog = () => {
    setIsUpdateCard(false);
    setOpenQuestionForm(false);
  };

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
    clearErrorEditCard();
  }

  const clearErrorEditCard = () => {
    setFormCardErrors({});
  }

  const handleUpdateCard = (e) => {
    e.preventDefault();

    //Validate
    if (commonUtility.checkNullOrEmpty(inputText)) {
      setFormCardErrors({...formCardErrors, inputText: {message : 'Please enter your question input text'}});
      return;
    }

    const card = {
      "questionId": question.id,
      "subjectId": subject.id,
      "inputText": inputText,
      "files": []
    };
    for (let i = 0; i < fileSelectedList.length; i++) {
      const file = {
        "fileName": fileSelectedList[i].fileName,
        "data": fileSelectedList[i].data
      }
      card["files"].push(file);
    }

    dispatch(updateCard(card))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setUpdateCardFail(false);
            setIsUpdateCard(true);

            closeAddQuestionDialog();
            // clearDataCardForm();
          } else {
            setUpdateCardFail(true);
            setIsUpdateCard(true);
          }
        })
        .catch(() => {
          console.log("Update card has failed");
          setUpdateCardFail(true);
          setIsUpdateCard(true);
        });
  }

  const handleDeleteCard = (e) => {
    e.preventDefault();

    const card = {
      "questionId": question.id,
      "subjectId": subject.id,
    };

    dispatch(deleteCard(card))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(deleteUserSubjectQuestion(result.card));
            setUpdateCardFail(false);
            setIsUpdateCard(true);

            closeAddQuestionDialog();
          } else {
            setUpdateCardFail(true);
            setIsUpdateCard(true);
          }
        })
        .catch(() => {
          console.log("Update card has failed");
          setUpdateCardFail(true);
          setIsUpdateCard(true);
        });
  }

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
              <DialogTitle style={{backgroundColor: "#f0f1f3"}}>
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
                </Grid>
              </DialogTitle>
              <DialogContent style={{backgroundColor: "#f0f1f3"}} sx={{minWidth: 700}}>
                <Grid container spacing={2}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Box sx={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: "20px" }}>
                      <Card sx={{ minWidth: 10 }} style={{ border: "none", boxShadow: "none" }}>
                        <CardContent>
                          <Typography style={viewStyles.cardInfoTitle}>
                            Members
                          </Typography>
                          <PersonOutlineOutlinedIcon fontSize="large"></PersonOutlineOutlinedIcon>
                          <ControlPointIcon fontSize="large"></ControlPointIcon>
                        </CardContent>
                      </Card>
                      <Card sx={{ minWidth: 10 }} style={{ border: "none", boxShadow: "none" }}>
                        <CardContent>
                          <Typography style={viewStyles.cardInfoTitle}>
                            Labels
                          </Typography>
                          <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={question.status === 1 ? viewStyles.answeredPill : viewStyles.notAnsweredPill}></div>
                            <ControlPointIcon fontSize="large"></ControlPointIcon>
                          </Box>
                        </CardContent>
                      </Card>
                      <Card sx={{ minWidth: 10 }} style={{ border: "none", boxShadow: "none" }}>
                        <CardContent>
                          <Typography style={viewStyles.cardInfoTitle}>
                            Notifications
                          </Typography>
                          <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            <Typography style={viewStyles.cardInfoTitle}>
                              Watching
                            </Typography>
                            <RemoveRedEyeIcon fontSize="large"></RemoveRedEyeIcon>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack sx={{ minWidth: 500 }} spacing={2} visibility={isUpdateCard ? 'visible' : 'hidden'}>
                      <Alert severity={updateCardFail ? 'error' : 'success'}>
                        <AlertTitle>{updateCardFail ? 'Success' : 'Eror'}</AlertTitle>
                        <strong>{descUpdateCard}</strong>
                      </Alert>
                    </Stack>
                  </Grid>

                  <Grid item xs={1}>
                    <DensitySmallOutlinedIcon fontSize="large"></DensitySmallOutlinedIcon>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={viewStyles.description}>Description</div>
                  </Grid>
                  <Grid item xs={2} alignItems="center">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 50, borderRadius: "5px" }}
                        // disabled={isLoading}
                        onClick={handleUpdateCard}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item xs={2} alignItems="center">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 50, borderRadius: "5px" }}
                        onClick={handleDeleteCard}
                        // disabled={isLoading}
                    >
                      Delete
                    </Button>
                  </Grid>
                  <Grid item xs={5}></Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                      <textarea
                          rows={20}
                          style={{minWidth: "700px"}}
                          defaultValue={detailCard.inputText}
                          onChange={(e) => handleInputTextChange(e)}
                      >
                      </textarea >
                      <FormHelperText disabled={!!formCardErrors['inputText']} style={{ color: "red" }}>{formCardErrors['inputText'] ? formCardErrors['inputText'].message : ''}</FormHelperText>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <ImageUploadCard setFileSelectedList={setFileSelectedList} fileSelectedList={fileSelectedList}/>
                  </Grid>

                  <Grid item xs={1}>
                    <ChatOutlinedIcon fontSize="large"></ChatOutlinedIcon>
                  </Grid>
                  <Grid item xs={9}>
                    <div style={viewStyles.description}>Activity</div>
                  </Grid>
                  <Grid item xs={2} alignItems="center">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // sx={{ mt: 3, mb: 2 }}
                        // disabled={isLoading}
                    >
                      Hide Details
                    </Button>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <textarea
                        rows={3}
                        style={{minWidth: "700px"}}
                        placeholder="Write a answer..."
                        // onChange={handleInputTextChange}
                    >
                      </textarea >
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
              <DialogActions style={{backgroundColor: "#f0f1f3"}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // disabled={isLoading}
                    onClick={closeAddQuestionDialog}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
        )}
      </React.Fragment>
  );
};

export default CardView;
