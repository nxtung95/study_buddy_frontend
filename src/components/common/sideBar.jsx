import React, { useState } from "react";
import { fonts } from "../Styles/theme";
import { useDispatch } from "react-redux";
import { addSubject } from "../../redux/slices/userSlice";
import {Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, FormControl, InputLabel} from '@mui/material';
import commonUtility from "../../utility/CommonUtility";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [openSubjectForm, setOpenSubjectForm] = useState(false);
  const [title, setTitle] = useState("");
  const [formErrors, setFormErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title };

    if (commonUtility.checkNullOrEmpty(title)) {
      setFormErrors({...formErrors, subjectTitle: {message : 'Please enter your title'}});
      return;
    }

    // dispatch(login(data))
    //     .unwrap()
    //     .then((result) => {
    //       if (commonUtility.isSuccess(result.code)) {
    //         navigate("/HomeScreen");
    //         setLoginFailed(false);
    //       } else {
    //         setLoginFailed(true);
    //       }
    //     })
    //     .catch(() => {
    //       console.log("Login has failed");
    //       setLoginFailed(true);
    //     });
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.buttons}>
        <button style={styles.button}>Profile</button>
        <button style={styles.button}>Tutors</button>
        <button style={styles.button}>Board Settings</button>
        <div style={styles.line}></div>
        <button style={styles.subjectButton} onClick={handleAddSubjectClick}>
          Add Subject
        </button>
        {openSubjectForm && (
            <Dialog open={openSubjectForm} onClose={handleClose} fullWidth="xs">
              <DialogTitle>Subject</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add subject here.
                </DialogContentText>

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
                        onchange={handleOnChangeSubjectTitle}
                        error={formErrors['subjectTitle']}
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
      </div>
    </div>
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
