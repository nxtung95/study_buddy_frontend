import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../redux/slices/userSlice";
import commonUtility from "../../utility/CommonUtility";
import {FormHelperText} from '@mui/material';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const isLoading = useSelector(state => state.user.isLoading);
  const desc = useSelector(state => state.user.desc);
  const [formErrors, setFormErrors] = useState({});
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, role, email, password };

    //Validate
    if (commonUtility.checkNullOrEmpty(firstName)) {
      setFormErrors({...formErrors, firstName: {message : 'Please enter your first name'}});
      return;
    }
    if (commonUtility.checkNullOrEmpty(lastName)) {
      setFormErrors({...formErrors, lastName: {message : 'Please enter your last name'}});
      return;
    }
    if (commonUtility.checkNullOrEmpty(role)) {
      setFormErrors({...formErrors, role: {message : 'Please enter your role'}});
      return;
    }
    if (commonUtility.checkNullOrEmpty(email)) {
      setFormErrors({...formErrors, email: {message : 'Please enter your email'}});
      return;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
        setFormErrors({...formErrors, email: {message : 'Invalid format email'}});
        return;
    }
    if (commonUtility.checkNullOrEmpty(password)) {
      setFormErrors({...formErrors, password: {message : 'Please enter your password'}});
      return;
    }

    dispatch(register(user))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            setIsOpenDialogOpen(true);
            setRegisterFailed(false);
          } else {
            setRegisterFailed(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setRegisterFailed(true);
          setIsOpenDialogOpen(true);
        });
    };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const resetFormFields = () => {
    setEmail(""); // Clear the input values
    setPassword("");
    setFirstName("");
    setLastName("");
    setRole("");
  };

  const handleClose = () => {
    setIsOpenDialogOpen(false); // Close the success dialog
    if (!registerFailed) {
      resetFormFields();
      window.location.reload();
    }
  };

  const clearError = () => {
    setFormErrors({});
  }

  const handleFirstNameChange = (e) => {
    clearError();
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    clearError();
    setLastName(e.target.value);
  }

  const handleRoleChange = (e) => {
    clearError();
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    clearError();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    clearError();
    setPassword(e.target.value);
  };

  return (
      <React.Fragment>
        <Container component="main" maxWidth="xs" sx={{opacity: isLoading ? '0.5' : '1'}}>
          <CssBaseline />
          <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Stack sx={{ width: '100%' }} spacing={2} visibility={registerFailed ? 'visible' : 'hidden'}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{desc}</strong>
              </Alert>
            </Stack>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => handleFirstNameChange(e)}
                      disabled={isLoading}
                      error={!!formErrors['firstName']}
                      helperText={formErrors['firstName'] ? formErrors['firstName'].message : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={(e) => handleLastNameChange(e)}
                      disabled={isLoading}
                      error={!!formErrors['lastName']}
                      helperText={formErrors['lastName'] ? formErrors['lastName'].message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!formErrors['role']}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={role}
                        label="Role"
                        name="role"
                        onChange={(e) => handleRoleChange(e)}
                        disabled={isLoading}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="tutor">Tutor</MenuItem>
                    </Select>
                    <FormHelperText disabled={!!formErrors['role']}>{formErrors['role'] ? formErrors['role'].message : ''}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => handleEmailChange(e)}
                      disabled={isLoading}
                      error={!!formErrors['email']}
                      helperText={formErrors['email'] ? formErrors['email'].message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => handlePasswordChange(e)}
                      disabled={isLoading}
                      error={!!formErrors['password']}
                      helperText={formErrors['password'] ? formErrors['password'].message : ''}
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="" variant="body2" onClick={handleLoginRedirect}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Dialog open={isOpenDialogOpen} onClose={handleClose}>
                <DialogTitle>{registerFailed ? 'Register failed' : 'Account Created Successfully'}</DialogTitle>
                <DialogContent>
                  {registerFailed ? 'System error' : 'Congratulations! Your account has been created successfully.'}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Container>
        <Box sx={{display: 'flex', position: 'fixed', left: '50%', top: '40%', opacity: '1'}} visibility={isLoading ? 'visible' : 'hidden'}>
          <CircularProgress />
        </Box>
      </React.Fragment>
  );
}
