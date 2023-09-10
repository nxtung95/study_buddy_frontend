import React, {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/slices/userSlice";
import Stack from "@mui/material/Stack";
import commonUtility from "../../utility/CommonUtility";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector(state => state.user.isLoading);
  const desc = useSelector(state => state.user.desc);
  const [formErrors, setFormErrors] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

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

    dispatch(login(data))
      .unwrap()
      .then((result) => {
        if (commonUtility.isSuccess(result.code)) {
          navigate("/HomeScreen");
          setLoginFailed(false);
        } else {
          setLoginFailed(true);
        }
      })
      .catch(() => {
        console.log("Login has failed");
        setLoginFailed(true);
      });
  };

  const handleSignupRedirect = () => {
    navigate("/SignupScreen");
  };

  const clearError = () => {
    setFormErrors({});
  }

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
          <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Stack sx={{ width: '100%' }} spacing={2} visibility={loginFailed ? 'visible' : 'hidden'}>
              <Alert severity="error">
                <AlertTitle>Error Login</AlertTitle>
                <strong>{desc}</strong>
              </Alert>
            </Stack>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => handleEmailChange(e)}
                  error={formErrors['email']}
                  helperText={formErrors['email'] ? formErrors['email'].message : ''}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => handlePasswordChange(e)}
                  error={formErrors['password']}
                  helperText={formErrors['password'] ? formErrors['password'].message : ''}
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="" variant="body2" onClick={handleSignupRedirect}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Box sx={{display: 'flex', position: 'fixed', left: '50%', top: '40%', opacity: '1'}} visibility={isLoading ? 'visible' : 'hidden'}>
          <CircularProgress />
        </Box>
      </React.Fragment>
  );
};

export default User;
