import * as React from 'react';
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
import { Alert, Stack } from '@mui/material';
import { registerUserAction } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux'; // Importing the necessary hooks
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Signup=() =>{

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const storeData = useSelector((store) => store.auth);
  const { loading, appErr, serverErr,  } = storeData;

  const [firstName, setFirstName] = React.useState('');
  
  const [Error, setError] = React.useState('');
   
  const [message, setmessage] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!(firstName && lastName && email && password)) {
        setError(true)
       setmessage("All fields are required");
        return;
      }
  
      if (!emailRegex.test(email)) {
     setError(true)
        setmessage("Invalid Email")
        return;
      }
     
  
      
  
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
  
     const res= await dispatch(registerUserAction(userData));
      
   
   if(!res.error){
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setError(false);
    navigate("/login");
   }
    } catch (error) {
      setmessage(error.message)
      console.log(error);
    }

  };

  useEffect(() => {
    if (appErr || serverErr) {
      setError(true);
      setmessage(appErr || serverErr);
    } else {
      setError(false);
      setmessage('');
    }
  }, [appErr, serverErr]);
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        
        <CssBaseline />
        {/* <Toaster /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/023/173/445/non_2x/tiny-people-studying-in-driving-school-and-passing-exams-driver-license-traffic-rules-road-signs-education-and-drive-lesson-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg)',
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
             Signup
            </Typography>
            {Error &&<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => {setError(false)}}>
        {message}
      </Alert>
    
    </Stack>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Stack direction="row" spacing={{ xs: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="firstName"
                autoFocus
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="lastName"
              />

              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
          
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
               {loading ?"Loading":" Sign up"}
               
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                   
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
           
          </Box>

                  <Link href="/" variant="body2" style={{display:"flex",alignSelf:"center",textDecoration:"none"}} >
                   <Button style={{margin:"0px auto",border:"1px solid grey "}}> {"Back to Dashboard"}</Button>
                  </Link>
                 
        </Grid>
      
      </Grid>
    </ThemeProvider>
  );
}

export default Signup;
