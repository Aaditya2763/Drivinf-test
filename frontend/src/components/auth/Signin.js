import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as ReactLink } from "react-router-dom";
import { loginUserAction } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

const defaultTheme = createTheme();

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store.auth);
  const { loading, appErr, serverErr } = storeData;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!(email && password)) {
        setError(true);
        setMessage("All fields are required");
        return;
      }

      if (!emailRegex.test(email)) {
        setError(true);
        setMessage("Invalid Email");
        return;
      }

      const userData = {
        email: email,
        password: password
      };

      const res = await dispatch(loginUserAction(userData));

      if (!res.error) {
        setEmail("");
        setPassword("");
        setError(false);
        setMessage('');
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (appErr || serverErr) {
      setError(true);
      setMessage(appErr || serverErr);
    } else {
      setError(false);
      setMessage('');
    }
  }, [appErr, serverErr]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images-platform.99static.com/Y9GT0EG2nOSCMpd9ELXcr7YHOSM=/500x500/top/smart/99designs-contests-attachments/17/17908/attachment_17908175)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             {loading?"Loading": "Sign In"}
            </Typography>
            {Error && <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" onClose={() => { setError(false) }}>
                {message}
              </Alert>
            </Stack>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <ReactLink to="/change-password" variant="body2">
                    Forgot password?
                  </ReactLink>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Link href="/" variant="body2" style={{ display: "flex", alignSelf: "center", textDecoration: "none" }} >
            <Button style={{ margin: "0px auto", border: "1px solid grey " }}> {"Back to Dashboard"}</Button>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signup;
