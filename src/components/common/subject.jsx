import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fonts} from "../Styles/theme";
import Card from "./card";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {deleteUserSubject, editUserSubject} from "../../redux/slices/userSlice";
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
  TextField
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
    setOpenQuestionForm(!openQuestionForm);
  }

  const closeAddQuestionDialog = () => {
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

      {/*Edit subject dialog*/}
      {openEditSubjectDialog && (
          <Dialog open={openEditSubjectDialog} onClose={handleCloseEditSubjectDialog} fullWidth={true}>
            <DialogTitle>Subject</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit subject
              </DialogContentText>

              <Stack sx={{ width: '100%' }} spacing={2} visibility={editSubjectFail ? 'visible' : 'hidden'}>
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
            console.log("Question data: ", question); // Add this console.log statement
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
          <Dialog open={openQuestionForm} onClose={closeAddQuestionDialog} fullWidth={true}>
            <DialogTitle>Card</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add card
              </DialogContentText>

              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {/*<strong>{desc}</strong>*/}
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
                  // onSubmit={handleSubmit}
              >
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="subjectTitle"
                      label="Subject Title"
                      type="text"
                      name="subjectTitle"
                      fullWidth
                      variant="standard"
                      // onChange={(e) => handleOnChangeSubjectTitle(e)}
                      // error={formErrors['subjectTitle'] ? true : false}
                      // helperText={formErrors['subjectTitle'] ? formErrors['subjectTitle'].message : ''}
                  />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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
