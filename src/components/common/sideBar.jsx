import React, {useState} from "react";
import {fonts} from "../Styles/theme";
import {useDispatch, useSelector} from "react-redux";
import {addUserSubject} from "../../redux/slices/userSlice";
import {addNewSubject} from "../../redux/slices/subjectSlice";
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
} from '@mui/material';
import commonUtility from "../../utility/CommonUtility";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [openSubjectForm, setOpenSubjectForm] = useState(false);
  const [title, setTitle] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [addSubjectFail, setAddSubjectFail] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const desc = useSelector(state => state.subject.desc);
  const currentUser = useSelector(state => state.user.currentUser);

  const handleAddSubjectClick = () => {
    setOpenSubjectForm(!openSubjectForm);
  };

  const handleClose = () => {
    setOpenSubjectForm(false);
  };

  const clearError = () => {
    setFormErrors({});
  }

  const handleOnChangeSubjectTitle = (e) => {
    clearError();
    setTitle(e.target.value);
  }

  const handleCloseDialog = () => {
    setIsOpenDialog(false); // Close the success dialog
    if (!addSubjectFail) {
      setTitle("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title };

    if (commonUtility.checkNullOrEmpty(title)) {
      setFormErrors({...formErrors, subjectTitle: {message : 'Please enter your title'}});
      return;
    }

    dispatch(addNewSubject(data))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(addUserSubject(result.subject));
            setIsOpenDialog(true);
          } else {
            setAddSubjectFail(true);
          }
        })
        .catch(() => {
          console.log("Add Subject has failed");
          setAddSubjectFail(true);
          setIsOpenDialog(true);
        });
  }

  return (
      <React.Fragment>
        <div style={styles.sidebar}>
          <div style={styles.buttons}>
            <button style={styles.button}>Profile</button>
            <button style={styles.button}>{commonUtility.checkRoleUser(currentUser.role) ? 'Students' : 'Tutors'}</button>
            <button style={styles.button}>Board Settings</button>
            <div style={styles.line}></div>
            {commonUtility.checkRoleUser(currentUser.role) && (
                <button style={styles.subjectButton} onClick={handleAddSubjectClick}>
                  Add Subject
                </button>
            )}
            {openSubjectForm && (
                <Dialog open={openSubjectForm} onClose={handleClose} fullWidth={true}>
                  <DialogTitle>Subject</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Add subject
                    </DialogContentText>

                    <Stack sx={{ width: '100%' }} spacing={2} visibility={addSubjectFail ? 'visible' : 'hidden'}>
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
                        onSubmit={handleSubmit}
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
                        Add subject
                      </Button>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
            )}
            <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
              <DialogTitle>{addSubjectFail ? 'Add subject failed' : 'Subject Created Successfully'}</DialogTitle>
              <DialogContent>
                {addSubjectFail ? 'System error' : 'Congratulations! Subject Created Successfully!.'}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </React.Fragment>
  );
};

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "200px",
    height: "100%",
    padding: "60px 25px 0px 0px",
  },
  button: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
  },
  subjectButton: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
    paddingTop: "20px",
  },
  line: {
    borderBottom: "1px solid #04E49C",
    marginTop: "16px",
    width: "115%",
  },
  languageDropdown: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
    paddingTop: "20px",
  },
};

export default Sidebar;
