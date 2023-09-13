import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fonts} from "../Styles/theme";
import Card from "./card";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {addUserSubjectQuestion, deleteUserSubject, editUserSubject, findTutor} from "../../redux/slices/userSlice";
import {deleteSubject, editSubject} from "../../redux/slices/subjectSlice";
import commonUtility from "../../utility/CommonUtility";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ImageUploadCard from "./uploadImage";
import {addCard} from "../../redux/slices/cardSlice";

const Subject = ({ subject }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openEditSubjectDialog, setOpenEditSubjectDialog] = useState(false);
  const [title, setTitle] = useState(subject.title);
  const [formErrors, setFormErrors] = useState({});
  const [editSubjectFail, setEditSubjectFail] = useState(false);
  const desc = useSelector(state => state.subject.desc);
  const tutors = useSelector(state => state.user.tutors);
  const [tutor, setTutor] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [fileSelectedList, setFileSelectedList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [formCardErrors, setFormCardErrors] = useState({});
  const isLoadingCard = useSelector(state => state.card.isLoading);
  const descAddCard = useSelector(state => state.card.desc);
  const [addCardFail, setAddCardFail] = useState(false);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeleteSubject = () => {
    setAnchorEl(null);
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseEditSubject = () => {
    setAnchorEl(null);
    setOpenEditSubjectDialog(false);
  };

  const handleDeleteSubject = () => {
    dispatch(deleteSubject(subject.id))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(deleteUserSubject(subject));
          }
          handleCloseDeleteSubject(); // Close the menu after deleting
        })
        .catch(() => {
          console.log("Delete Subject has failed");
        });
  };

  const openAddQuestionDialog = () => {
    dispatch(findTutor())
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setOpenQuestionForm(!openQuestionForm);
          } else {
            console.log("Find tutor has failed");
          }
        })
        .catch(() => {
          console.log("Find tutor has failed");
        });
  }

  const closeAddQuestionDialog = () => {
    clearDataCardForm();
    setOpenQuestionForm(false);
  };

  const handleCloseDeleteDialogConfirm = () => {
    setOpenConfirmDeleteDialog(false);
  }

  const handleOpenDeleteDialogConfirm = () => {
    setOpenConfirmDeleteDialog(!openConfirmDeleteDialog);
  }

  const handleCloseEditSubjectDialog = () => {
    setOpenEditSubjectDialog(false);
  }

  const handleOpenEditSubjectDialog = () => {
    setOpenEditSubjectDialog(!openEditSubjectDialog);
  }

  const clearErrorEditSubject = () => {
    setFormErrors({});
  }

  const handleOnChangeSubjectTitle = (e) => {
    clearErrorEditSubject();
    setTitle(e.target.value);
  }

  const handleSubmitEditSubject = (e) => {
    e.preventDefault();

    const data = { 'id': subject.id, 'title': title };

    if (commonUtility.checkNullOrEmpty(title)) {
      setFormErrors({...formErrors, subjectTitle: {message : 'Please enter your title'}});
      return;
    }

    dispatch(editSubject(data))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(editUserSubject(result.subject));
            setEditSubjectFail(false);
            handleCloseEditSubject();
          } else {
            setEditSubjectFail(true);
          }
        })
        .catch(() => {
          console.log("Edit Subject has failed");
          setEditSubjectFail(true);
        });
  }

  const clearErrorAddCard = () => {
    setFormCardErrors({});
  }
  
  const clearDataCardForm = () => {
    setCardTitle("")
    setTutor("");
    setFileSelectedList([]);
    setInputText("");
  }

  const handleTutorChange = (e) => {
    setTutor(e.target.value);
    clearErrorAddCard();
  }

  const handleChangeTitle = (e) => {
    setCardTitle(e.target.value);
    clearErrorAddCard();
  }

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
    clearErrorAddCard();
  }

  const handleSubmitAddCard = (e) => {
    e.preventDefault();

    //Validate
    if (commonUtility.checkNullOrEmpty(cardTitle)) {
      setFormCardErrors({...formCardErrors, title: {message : 'Please enter your question title'}});
      return;
    }
    if (commonUtility.checkNullOrEmpty(tutor)) {
      setFormCardErrors({...formCardErrors, tutor: {message : 'Please choose the tutor'}});
      return;
    }
    if (commonUtility.checkNullOrEmpty(inputText)) {
      setFormCardErrors({...formCardErrors, inputText: {message : 'Please enter your question input text'}});
      return;
    }

    const card = {
      "tutorId": tutor,
      "subjectId": subject.id,
      "title": cardTitle,
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

    dispatch(addCard(card))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(addUserSubjectQuestion(result.card));
            setAddCardFail(false);
            closeAddQuestionDialog();
            // clearDataCardForm();
          } else {
            setAddCardFail(true);
          }
        })
        .catch(() => {
          console.log("Add card has failed");
          setAddCardFail(true);
        });

  }

  return (
    <div style={styles.subjectContainer}>
      <div style={styles.titleContainer}>
        <h3 style={styles.title}>{subject.title}</h3>
        <IconButton onClick={handleMoreClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDeleteSubject}
        >
          <MenuItem onClick={handleOpenDeleteDialogConfirm}>Delete</MenuItem>
          <MenuItem onClick={handleOpenEditSubjectDialog}>Edit</MenuItem>
        </Menu>
      </div>

      {/*Delete subject confirm dialog*/}
      {
        openConfirmDeleteDialog && (
              <Dialog
                  open={openConfirmDeleteDialog}
                  onClose={handleCloseDeleteDialogConfirm}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to delete this subject?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleDeleteSubject} autoFocus>
                    Yes
                  </Button>
                  <Button onClick={handleCloseDeleteDialogConfirm}>Cancel</Button>
                </DialogActions>
              </Dialog>
        )}


      {/*Edit subject dialog*/}
      {openEditSubjectDialog && (
          <Dialog open={openEditSubjectDialog} onClose={handleCloseEditSubjectDialog} fullWidth={true}>
            <DialogTitle>Subject</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit subject
              </DialogContentText>

              <Stack sx={{ mt: 2, minWidth: 550 }} spacing={2} visibility={editSubjectFail ? 'visible' : 'hidden'}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>{desc}</strong>
                </Alert>
              </Stack>

              <Box
                  noValidate
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                  }}
                  onSubmit={handleSubmitEditSubject}
              >
                <FormControl sx={{ mt: 2, minWidth: 550 }}>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="subjectTitle"
                      label="Subject Title"
                      type="text"
                      name="subjectTitle"
                      fullWidth
                      variant="standard"
                      value={title}
                      onChange={(e) => handleOnChangeSubjectTitle(e)}
                      error={formErrors['subjectTitle'] ? true : false}
                      helperText={formErrors['subjectTitle'] ? formErrors['subjectTitle'].message : ''}
                  />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                  Edit subject
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditSubjectDialog}>Close</Button>
            </DialogActions>
          </Dialog>
      )}

      <div style={styles.cardList}>
        {
          subject.questions && subject.questions.map((question, index) => {
            return <Card key={index} question={question} />;
          })
        }
      </div>
      <div style={styles.addCard} onClick={openAddQuestionDialog}>
        <IconButton style={styles.addCardButton}>
          <AddCircleOutlineIcon />
        </IconButton>
        <h3 style={styles.addCardText}>Add card</h3>
      </div>
      {openQuestionForm && (
          <Dialog open={openQuestionForm} onClose={closeAddQuestionDialog} fullWidth>
            <DialogTitle>Card</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add card
              </DialogContentText>

              <Stack sx={{ minWidth: 500 }} spacing={2} visibility={addCardFail ? 'visible' : 'hidden'}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>{descAddCard}</strong>
                </Alert>
              </Stack>

              <Box
                  noValidate
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    m: 'auto',
                    width: 'fit-content',
                  }}
                  onSubmit={handleSubmitAddCard}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        onChange={(e) => handleChangeTitle(e)}
                        disabled={isLoadingCard}
                        error={formCardErrors['title']}
                        helperText={formCardErrors['title'] ? formCardErrors['title'].message : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!formCardErrors['tutor']} >
                      <InputLabel id="tutor-label">Tutor</InputLabel>
                      <Select
                          labelId="tutor-label"
                          id="tutor"
                          name="tutor"
                          value={tutor}
                          label="Tutor"
                          onChange={(e) => handleTutorChange(e)}
                          disabled={isLoadingCard}
                      >
                        {
                            tutors && (
                                tutors.map((tutor, index) => {
                                    return <MenuItem style={{display: "flex"}} key={index} value={tutor.id}>{tutor.firstName + " " + tutor.lastName}</MenuItem>
                                })
                            )
                        }
                      </Select>
                      <FormHelperText disabled={!!formCardErrors['tutor']}>{formCardErrors['tutor'] ? formCardErrors['tutor'].message : ''}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                        minRows={15}
                        style={{width: "500px"}}
                        placeholder="Enter input text question"
                        onChange={handleInputTextChange}>
                    </TextareaAutosize>
                    <FormHelperText disabled={!!formCardErrors['inputText']} style={{ color: "red" }}>{formCardErrors['inputText'] ? formCardErrors['inputText'].message : ''}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2, mb: 5 }}>
                    <ImageUploadCard setFileSelectedList={setFileSelectedList}/>
                  </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                >
                  Add card
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeAddQuestionDialog}>Close</Button>
            </DialogActions>
          </Dialog>
      )}
    </div>
  );
};

const styles = {
  subjectContainer: {
    backgroundColor: "#F0F1F3",
    borderRadius: "10px",
    padding: "10px",
    margin: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "308px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    ...fonts.subjectSemiBold,
    margin: "5px 4px 0 5px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
  },
  addCard: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto", // Pushes the "Add Card" button to the bottom
    paddingTop: "30px",
  },
  addCardText: {
    ...fonts.subjectCardNormal,
    margin: "0",
  },
  addCardButton: {
    ...fonts.subjectCardNormal,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default Subject;
