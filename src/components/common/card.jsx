import React, {useState} from "react";
import {fonts} from "../Styles/theme";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Switch,
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
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import ImageUploadCard from "./uploadImage";
import {useDispatch, useSelector} from "react-redux";
import commonUtility from "../../utility/CommonUtility";
import {
  addAnswerCard,
  deleteCard,
  updateCard,
  updateCardContact,
  updateCardStatus,
  updateContact,
  updateSolution,
  updateStatus,
  viewCard,
  updateRegistCardContact,
  updateRegisterContact
} from "../../redux/slices/cardSlice";
import {changeStatusQuestion, deleteUserSubjectQuestion} from "../../redux/slices/userSlice";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Comment from "../common/comment"
import {addAnswer} from "../../redux/slices/answerSlice";
import FormControl from "@mui/material/FormControl";
import ChatMessage from "../Chat/ChatMessage";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CardView = ({ question, subject }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const [isHovering, setIsHovering] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [content, setContent] = useState("");
  const [formAnswerErrors, setFormAnswerErrors] = useState({});
  const [formCardErrors, setFormCardErrors] = useState({});
  const [isUpdateCard, setIsUpdateCard] = useState(false);
  const [isUpdateContact, setIsUpdateContact] = useState(false);
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);
  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const [isUpdateSolution, setIsUpdateSolution] = useState(false);
  const [isErrorViewSolution, setIsErrorViewSolution] = useState(false);
  const [updateCardFail, setUpdateCardFail] = useState(false);
  const [updateContactFail, setUpdateContactFail] = useState(false);
  const [updateStatusFail, setUpdateStatusFail] = useState(false);
  const [updateAddAnswerFail, setUpdateAddAnswerFail] = useState(false);
  const [updateSolutionFail, setUpdateSolutionFail] = useState(false);
  const [hideAnswer, setHideAnswer] = useState(true);
  const descUpdateCard = useSelector(state => state.card.desc);
  const descUpdateContact = useSelector(state => state.card.desc);
  const descUpdateStatus = useSelector(state => state.card.desc);
  const descUpdateSolution = useSelector(state => state.card.desc);
  const descAddAnswer = useSelector(state => state.answer.desc);
  const detailCard = useSelector(state => state.card.detailCard);
  const [openDialogChangeStatus, setOpenDialogChangeStatus] = useState(false);
  const [openDialogChat, setOpenDialogChat] = useState(false);
  const [inputText, setInputText] = useState(detailCard.inputText);
  const [fileSelectedList, setFileSelectedList] = useState(detailCard.images);
  const [solutionFileSelectedList, setSolutionFileSelectedList] = useState(detailCard.solutions);

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
    connectIcon: {
      margin: "5px",
      backgroundColor: "#FFF",
      cursor: "pointer"
    },
    solution: {
      ...fonts.subjectCardNormal,
      fontSize: "15px",
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
            setInputText(result.inputText);
            setFileSelectedList(result.images);
            setSolutionFileSelectedList(result.solutions);
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
    setIsUpdateContact(false);
    setIsAddAnswer(false);
    setIsUpdateStatus(false);
    setIsUpdateSolution(false);
    setIsErrorViewSolution(false);
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

  const handleAddAnswer = (e) => {
    e.preventDefault();

    //Validate
    if (commonUtility.checkNullOrEmpty(content)) {
      setFormAnswerErrors({...formAnswerErrors, answer: {message : 'Please enter your answer'}});
      return;
    }

    const answer = {
      "questionId": question.id,
      "tutorId": currentUser.id,
      "content": content
    };

    dispatch(addAnswer(answer))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(addAnswerCard(result.answer))
            setUpdateAddAnswerFail(false);
          } else {
            setUpdateAddAnswerFail(true);
          }
          setIsAddAnswer(true);
        })
        .catch(() => {
          console.log("Add answer has failed");
          setIsAddAnswer(true);
          setUpdateAddAnswerFail(true);
        });
  }

  const handleContentTextChange = (e) => {
    setFormAnswerErrors({});
    setContent(e.target.value);
  }

  const handleChangeAllowChat = (e) => {
    const data = {
      "type": 0,
      "chatMessage": e.target.checked
    }
    dispatch(updateCardContact(data));
  }

  const handleChangeVideoCall = (e) => {
    const data = {
      "type": 1,
      "videoCall": e.target.checked
    }
    dispatch(updateCardContact(data));
  }

  const handleChangeVoiceCall = (e) => {
    const data = {
      "type": 2,
      "voiceCall": e.target.checked
    }
    dispatch(updateCardContact(data));
  }

  const handleChangeRegiserChat = (e) => {
    const data = {
      "type": 0,
      "registChat": e.target.checked
    }
    dispatch(updateRegistCardContact(data));
  }

  const handleChangeRegisterVideoCall = (e) => {
    const data = {
      "type": 1,
      "registVideoCall": e.target.checked
    }
    dispatch(updateRegistCardContact(data));
  }

  const handleChangeRegisterVoiceCall = (e) => {
    const data = {
      "type": 2,
      "registVoiceCall": e.target.checked
    }
    dispatch(updateRegistCardContact(data));
  }

  const handleApplyContact = (e) => {
    e.preventDefault();

    const data = {
      'questionId': question.id,
      'isAllowChat': detailCard.chatMessage ? 1 : 0,
      'isAllowVideoCall': detailCard.videoCall ? 1 : 0,
      'isAllowVoiceCall': detailCard.voiceCall ? 1 : 0
    }

    dispatch(updateContact(data))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setUpdateContactFail(false);
          } else {
            setUpdateContactFail(true);
          }
          setIsUpdateContact(true);
        })
        .catch(() => {
          console.log("Update contact has failed");
          setUpdateContactFail(true);
          setIsUpdateContact(true);
        });
  }

  const handleApplyRegisterContact = (e) => {
    e.preventDefault();

    const data = {
      'questionId': question.id,
      'isRegistChat': detailCard.registChat ? 1 : 0,
      'isRegistVideoCall': detailCard.registVideoCall ? 1 : 0,
      'isRegistVoiceCall': detailCard.registVoiceCall ? 1 : 0
    }

    dispatch(updateRegisterContact(data))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setUpdateContactFail(false);
          } else {
            setUpdateContactFail(true);
          }
          setIsUpdateContact(true);
        })
        .catch(() => {
          console.log("Update contact has failed");
          setUpdateContactFail(true);
          setIsUpdateContact(true);
        });
  }

  const handleChangeStatus = (e) => {
    e.preventDefault();

    const data = {
      'questionId': question.id,
      'status': detailCard.status === 1 ? 0 : 1,
      'tutorId': currentUser.id
    }

    dispatch(updateStatus(data))
        .unwrap()
        .then((result) => {
          handleCloseDialogChangeStatus();
          if (commonUtility.isSuccess(result.code)) {
            dispatch(changeStatusQuestion(data));
            dispatch(updateCardStatus(result.card));
            setUpdateStatusFail(false);;
          } else {
            setUpdateStatusFail(true);
          }
          setIsUpdateStatus(true);
        })
        .catch(() => {
          handleCloseDialogChangeStatus();
          console.log("Update status has failed");
          setUpdateStatusFail(true);
          setIsUpdateStatus(true);
        });
  }

  const handleCloseDialogChangeStatus = () => {
    setOpenDialogChangeStatus(!openDialogChangeStatus);
  }

  const handleCloseDialogChat = () => {
    setOpenDialogChat(!openDialogChat);
  }

  const handleChatMessage = () => {
    setOpenDialogChat(true);
  }

  const handleViewImage = (e) => {
    const selectIndex = e.currentTarget.getAttribute("data-image");
    const selectedImage = fileSelectedList.filter((file, index) => {
      return parseInt(index) === parseInt(selectIndex);
    });
    var newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + selectedImage[0].data + '">';
  }

  const handleUploadSolution = (e) => {
    e.preventDefault();

    const card = {
      "questionId": question.id,
      "subjectId": subject.id,
      "files": []
    };
    for (let i = 0; i < solutionFileSelectedList.length; i++) {
      const file = {
        "fileName": solutionFileSelectedList[i].fileName,
        "data": solutionFileSelectedList[i].data
      }
      card["files"].push(file);
    }

    dispatch(updateSolution(card))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setUpdateSolutionFail(false);
            setIsUpdateSolution(true);
          } else {
            setUpdateSolutionFail(true);
            setIsUpdateSolution(true);
          }
        })
        .catch(() => {
          console.log("Update solution has failed");
          setUpdateSolutionFail(true);
          setIsUpdateSolution(true);
        });
  }

  const viewSolution = (e) => {
    e.preventDefault();

    if (solutionFileSelectedList.length <= 0) {
      setIsErrorViewSolution(true);
      return;
    }

    setTimeout(function() {
      for (var i = 0; i < solutionFileSelectedList.length; i++) {
        var newTab = window.open();
        newTab.document.body.innerHTML = '<img src="' + solutionFileSelectedList[i].data + '">';
      }
    }, 500);
  }

  const handleVideoCall = (e) => {
    e.preventDefault();

    const userName = currentUser.firstName + " " + currentUser.lastName;

    const url = process.env.PUBLIC_URL + "/VideoCall.html?roomId=" + question.id + "&userName=" + userName;
    window.open(url);
  }

  const handleVoiceCall = (e) => {
    e.preventDefault();

    const userName = currentUser.firstName + " " + currentUser.lastName;
    const url = process.env.PUBLIC_URL + "/VoiceChat.html?roomId=" + question.id + "&userName=" + userName;
    window.open(url);
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
                <p style={styles.answeredByText}>Answered by: {question.tutorName}</p>
            )
          }
        </div>

        {
          openDialogChangeStatus && (
                <Dialog
                    open={openDialogChangeStatus}
                    onClose={handleCloseDialogChangeStatus}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Do you want to switch to resolve/unresolved this question?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {detailCard.status === 0 ? 'Resolve this question' : 'Unresolved this requestion'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleChangeStatus} autoFocus>
                      Agree
                    </Button>
                    <Button onClick={handleCloseDialogChangeStatus}>Disagree</Button>
                  </DialogActions>
                </Dialog>
            )
        }

        {
            openDialogChat && (
                <ChatMessage
                    openDialogChat={openDialogChat}
                    handleCloseDialogChat={handleCloseDialogChat}
                    question={question}
                >
                </ChatMessage>
          )
        }

        {openQuestionForm && (
            <Dialog open={openQuestionForm} onClose={closeAddQuestionDialog} maxWidth="md">
              <DialogTitle style={{backgroundColor: "#f0f1f3"}}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <ArticleOutlinedIcon color="primary" fontSize="large"></ArticleOutlinedIcon>
                  </Grid>
                  <Grid item xs={6} >
                    <Grid item xs={12}>
                      <div style={viewStyles.cardTitle}>{question.title}</div>
                    </Grid>
                    <Grid item xs={12}><Typography style={viewStyles.subCardTitle}>in list {subject.title}</Typography></Grid>
                  </Grid>
                  <Grid item xs={5}>
                    {
                      ((commonUtility.checkRoleTutor(currentUser.role) && currentUser.id === detailCard.tutorId) || (!commonUtility.isSolvedQuestion(deleteCard.status) && commonUtility.checkRoleTutor(currentUser.role))) && (
                          <FormControlLabel
                              control={
                                <Switch size="medium" checked={!!(detailCard && detailCard.status === 1)}
                                        onChange={(e) => setOpenDialogChangeStatus(true)} />
                              }
                              label="Resolve question"
                          />
                        )
                    }
                  </Grid>

                  {
                    (isUpdateStatus && commonUtility.checkRoleTutor(currentUser.role)) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                              <Stack sx={{ minWidth: 500 }} spacing={2} visibility={isUpdateStatus ? 'visible' : 'hidden'}>
                                <Alert severity={updateStatusFail ? 'error' : 'success'}>
                                  <AlertTitle>{updateStatusFail ? 'Error' : 'Success'}</AlertTitle>
                                  <strong>{descUpdateStatus}</strong>
                                </Alert>
                              </Stack>
                          </Grid>
                        </React.Fragment>
                      )
                  }
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
                          <PersonOutlineOutlinedIcon color="primary" fontSize="large"></PersonOutlineOutlinedIcon>
                          <ControlPointIcon color="primary" fontSize="large"></ControlPointIcon>
                        </CardContent>
                      </Card>
                      <Card sx={{ minWidth: 10 }} style={{ border: "none", boxShadow: "none" }}>
                        <CardContent>
                          <Typography style={viewStyles.cardInfoTitle}>
                            Labels
                          </Typography>
                          <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={question.status === 1 ? viewStyles.answeredPill : viewStyles.notAnsweredPill}></div>
                            <ControlPointIcon color="primary" fontSize="large"></ControlPointIcon>
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
                            <RemoveRedEyeIcon color="primary" fontSize="large"></RemoveRedEyeIcon>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>

                  {
                    (isUpdateCard && commonUtility.checkRoleUser(currentUser.role)) && (
                        <Grid item xs={12}>
                          <Stack sx={{ minWidth: 500 }} spacing={2} visibility={isUpdateCard ? 'visible' : 'hidden'}>
                            <Alert severity={updateCardFail ? 'error' : 'success'}>
                              <AlertTitle>{updateCardFail ? 'Error' : 'Success'}</AlertTitle>
                              <strong>{descUpdateCard}</strong>
                            </Alert>
                          </Stack>
                        </Grid>
                    )
                  }

                  <Grid item xs={1}>
                    <DensitySmallOutlinedIcon color="primary" fontSize="large"></DensitySmallOutlinedIcon>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={viewStyles.description}>Description</div>
                  </Grid>
                  {
                    commonUtility.checkRoleUser(currentUser.role) && (
                        <React.Fragment>
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
                        </React.Fragment>
                    )
                  }
                  <Grid item xs={commonUtility.checkRoleUser(currentUser.role) ? 5 : 9}></Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                      <textarea
                          rows={20}
                          style={{minWidth: "755px"}}
                          defaultValue={inputText}
                          onChange={(e) => handleInputTextChange(e)}
                          disabled={commonUtility.checkRoleUser(currentUser.role) ? false : true}
                      >
                      </textarea >
                      <FormHelperText disabled={!!formCardErrors['inputText']} style={{ color: "red" }}>{formCardErrors['inputText'] ? formCardErrors['inputText'].message : ''}</FormHelperText>
                  </Grid>

                  {/*Handle image*/}
                  {
                    commonUtility.checkRoleUser(currentUser.role) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            <ImageUploadCard setFileSelectedList={setFileSelectedList} fileSelectedList={fileSelectedList}/>
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                    commonUtility.checkRoleTutor(currentUser.role) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            {
                              fileSelectedList.length > 0 && (
                                  <Box component="div" sx={{ minWidth: 350 }}>
                                    <Card>
                                      <CardContent>
                                        <Grid container justifyContent="flex-start" alignItems="center">
                                          {
                                            fileSelectedList.map((selectedFile, index) => {
                                              return <Card sx={{ maxWidth: 200 }} key={index}>
                                                <CardMedia
                                                    alt="Img"
                                                    style={{width: 100, height: 100}}
                                                    component="img"
                                                    src={selectedFile.data}
                                                />
                                                <CardActions disableSpacing={true}>
                                                  <IconButton  sx={{
                                                    "&:hover": {
                                                      backgroundColor: "#e0e0e0",
                                                    }
                                                  }} aria-label="delete" size="large" data-image={index} onClick={(e) => handleViewImage(e)}>
                                                    <VisibilityIcon color="primary" fontSize="medium" />
                                                  </IconButton>
                                                </CardActions>
                                              </Card>
                                            })
                                          }
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  </Box>
                              )
                            }
                          </Grid>
                        </React.Fragment>
                      )
                  }

                  <Grid item xs={1}>
                    <ChatOutlinedIcon color="primary" fontSize="large"></ChatOutlinedIcon>
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
                        onClick={() => setHideAnswer(!hideAnswer)}
                    >
                      Hide Details
                    </Button>
                  </Grid>

                  {
                    commonUtility.checkRoleTutor(currentUser.role) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleAddAnswer}
                            >
                              Add answer
                            </Button>
                          </Grid>
                          <Grid item xs={9}>
                            {
                              isAddAnswer && (
                                    <Stack sx={{ minWidth: 500, margin: 0, padding: 0 }} visibility={isAddAnswer ? 'visible' : 'hidden'}>
                                      <Alert severity={updateAddAnswerFail ? 'error' : 'success'}>
                                        <AlertTitle>{updateAddAnswerFail ? 'Error' : 'Success'}</AlertTitle>
                                        <strong>{descAddAnswer}</strong>
                                      </Alert>
                                    </Stack>
                                )
                            }
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                    commonUtility.checkRoleTutor(currentUser.role) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            <textarea
                                rows={10}
                                style={{minWidth: "755px"}}
                                placeholder="Write a answer..."
                                onChange={handleContentTextChange}
                            >
                            </textarea >
                            <FormHelperText disabled={!!formAnswerErrors['answer']} style={{ color: "red" }}>{formAnswerErrors['answer'] ? formAnswerErrors['answer'].message : ''}</FormHelperText>
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                    hideAnswer && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            <Comment answers={detailCard.answers}/>
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                      ((commonUtility.checkRoleTutor(currentUser.role) && currentUser.id === detailCard.tutorId) || (!commonUtility.isSolvedQuestion(deleteCard.status) && commonUtility.checkRoleTutor(currentUser.role))) && (
                          <React.Fragment>
                            <Grid item xs={1}>
                              <EmojiObjectsOutlinedIcon color="primary" fontSize="large"></EmojiObjectsOutlinedIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <ImageUploadCard setFileSelectedList={setSolutionFileSelectedList} fileSelectedList={solutionFileSelectedList}/>
                            </Grid>
                            <Grid item xs={1}></Grid>

                            <Grid item xs={3}></Grid>
                            <Grid item xs={4}>
                              <Button
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  onClick={handleUploadSolution}
                              >
                                Upload solution
                              </Button>
                            </Grid>
                            <Grid item xs={5}></Grid>
                          </React.Fragment>
                      )
                  }
                  {
                    (commonUtility.checkRoleTutor(currentUser.role) && isUpdateSolution)  && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            <Stack sx={{ minWidth: 500 }} spacing={2} visibility={isUpdateSolution ? 'visible' : 'hidden'}>
                              <Alert severity={updateSolutionFail ? 'error' : 'success'}>
                                <AlertTitle>{updateSolutionFail ? 'Error upload solution' : 'Success upload solution'}</AlertTitle>
                                <strong>{descUpdateSolution}</strong>
                              </Alert>
                            </Stack>
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                    (commonUtility.checkRoleUser(currentUser.role) && commonUtility.isSolvedQuestion(detailCard.status)) && (
                        <React.Fragment>
                          <Grid item xs={1}>
                            <PersonOutlineOutlinedIcon color="primary" fontSize="large"></PersonOutlineOutlinedIcon>
                          </Grid>
                          <Grid item xs={11}>
                            <Grid item xs={12}>
                              <div style={viewStyles.solution}><b>{detailCard.tutorName}</b> solved the question <a href="#/" onClick={viewSolution}>view here</a></div>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="div" styles={viewStyles.solution}>{detailCard.answerDate}</Typography>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                    )
                  }
                  {
                    (commonUtility.checkRoleUser(currentUser.role) && commonUtility.isSolvedQuestion(detailCard.status) && isErrorViewSolution) && (
                        <React.Fragment>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={11}>
                            <Stack sx={{ minWidth: 500 }} spacing={2}>
                              <Alert severity='error'>
                                <AlertTitle>Error view solution</AlertTitle>
                                <strong>The solution is empty</strong>
                              </Alert>
                            </Stack>
                          </Grid>
                        </React.Fragment>
                    )
                  }

                  {
                    commonUtility.checkRoleUser(currentUser.role) && (
                      <React.Fragment>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">Register contact</FormLabel>
                            <FormGroup>
                              <Box sx={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: "10px" }}>
                                <FormControlLabel
                                    control={
                                      <Switch checked={detailCard.registChat} onChange={handleChangeRegiserChat} name="isRegistChatMessage" />
                                    }
                                    label="Regist chat message"
                                />
                                <FormControlLabel
                                    control={
                                      <Switch checked={detailCard.registVoiceCall} onChange={handleChangeRegisterVoiceCall} name="isRegistVoiceCall" />
                                    }
                                    label="Regist voice call"
                                />
                                <FormControlLabel
                                    control={
                                      <Switch checked={detailCard.registVideoCall} onChange={handleChangeRegisterVideoCall} name="isRegistVideoCall" />
                                    }
                                    label="Regist video call"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleApplyRegisterContact}
                                >
                                  Apply
                                </Button>
                              </Box>
                            </FormGroup>
                          </FormControl>
                        </Grid>

                        {
                            isUpdateContact && (
                                <React.Fragment>
                                  <Grid item xs={1}></Grid>
                                  <Grid item xs={11}>
                                    <Stack sx={{ minWidth: 500 }} spacing={2}>
                                      <Alert severity={updateContactFail ? 'error' : 'success'}>
                                        <AlertTitle>{updateContactFail ? 'Error' : 'Success'}</AlertTitle>
                                        <strong>{descUpdateContact}</strong>
                                      </Alert>
                                    </Stack>
                                  </Grid>
                                </React.Fragment>
                            )
                          }
                      </React.Fragment>
                    )
                  }

                  {
                    ((commonUtility.checkRoleTutor(currentUser.role) && currentUser.id === detailCard.tutorId) 
                    || (!commonUtility.isSolvedQuestion(deleteCard.status) && commonUtility.checkRoleTutor(currentUser.role))) && (
                        <React.Fragment>
                          {
                            (detailCard.registChat || detailCard.registVoiceCall || detailCard.registVideoCall) && (
                              <React.Fragment>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={11}>
                                  <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">Allow contact</FormLabel>
                                    <FormGroup>
                                      <Box sx={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: "10px" }}>
                                        {
                                          detailCard.registChat && (
                                            <FormControlLabel
                                              control={
                                                <Switch checked={detailCard.chatMessage} onChange={handleChangeAllowChat} name="isAllowChatMessage" />
                                              }
                                              label="Allow chat message"
                                            />
                                          )
                                        }
                                        {
                                          detailCard.registVoiceCall && (
                                            <FormControlLabel
                                              control={
                                                <Switch checked={detailCard.voiceCall} onChange={handleChangeVoiceCall} name="isAllowVoiceCall" />
                                              }
                                              label="Allow voice call"
                                            />
                                          )
                                        }
                                        {
                                          detailCard.registVideoCall && (
                                            <FormControlLabel
                                              control={
                                                <Switch checked={detailCard.videoCall} onChange={handleChangeVideoCall} name="isAllowVideoCall" />
                                              }
                                              label="Allow video call"
                                            />
                                          )
                                        }
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={handleApplyContact}
                                        >
                                          Apply
                                        </Button>
                                      </Box>
                                    </FormGroup>
                                  </FormControl>
                                </Grid>

                                {
                                  isUpdateContact && (
                                      <React.Fragment>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={11}>
                                          <Stack sx={{ minWidth: 500 }} spacing={2}>
                                            <Alert severity={updateContactFail ? 'error' : 'success'}>
                                              <AlertTitle>{updateContactFail ? 'Error' : 'Success'}</AlertTitle>
                                              <strong>{descUpdateContact}</strong>
                                            </Alert>
                                          </Stack>
                                        </Grid>
                                      </React.Fragment>
                                  )
                                }
                              </React.Fragment>
                            )
                          }
                        </React.Fragment>
                    )
                  }
                  <Grid item xs={1}></Grid>
                    <Grid item xs={11}>
                      {
                          detailCard.chatMessage && (
                              <ChatIcon color="primary" fontSize="large" style={viewStyles.connectIcon} onClick={handleChatMessage}></ChatIcon>
                          )
                      }
                      {
                          detailCard.videoCall && (
                              <VideocamIcon color="primary" fontSize="large" style={viewStyles.connectIcon} onClick={handleVideoCall}></VideocamIcon>
                          )
                      }
                      {
                          detailCard.voiceCall && (
                              <MicIcon color="primary" fontSize="large" style={viewStyles.connectIcon} onClick={handleVoiceCall}></MicIcon>
                          )
                      }
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
