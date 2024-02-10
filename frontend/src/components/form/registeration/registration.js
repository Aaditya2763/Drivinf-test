import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { drivingTestRegistration } from '../../../redux/actions/userAction';
import { useEffect } from 'react'
import { Alert } from '@mui/material';
export default function RegistrationForm({validateFormData}) {
  const dispatch = useDispatch();
  const [Error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const  userdata=localStorage.getItem('userData');
  const loginuser=JSON.parse(userdata);
  const userId=loginuser._id;
  const storeData = useSelector((store) => store.auth);
  const userData = useSelector((store) => store.user);
  const {  user } = storeData;
  const { loading, appErr, serverErr,  } = userData;
  console.log(user)

useEffect(() => {
  if (loginuser && loginuser.firstName && loginuser.lastName && loginuser.address1 && loginuser.address2 && loginuser.city && loginuser.state && loginuser.zip && loginuser.country) {
    if (loginuser.isRegisteredDrivingTest) {
      setFormData({ ...formData, ...loginuser });
    } else {
      setFormData({ ...formData });
    }
  }
}, [])


  const [formData, setFormData] = React.useState({
    id:userId,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue ,id:userId});
    
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
  if(formData){
    await dispatch(drivingTestRegistration(formData))

    if(!(appErr && serverErr)){
      validateFormData()
    }
 else{
  if(appErr ||serverErr){
    setMessage(appErr ||serverErr)
  }
 setMessage("Something went wrong try again")
  setError(true)
 }
  }
  return
    // console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      {Error && message &&<Alert severity="warning" onClose={() => {setError(false) }}>
      
      {(appErr||serverErr) && <Typography variant="h6" gutterBottom>
        {appErr ||serverErr}
      </Typography>}
      </Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={formData.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={formData.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              type='number'
              value={formData.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" checked={formData.saveAddress} onChange={handleChange} />}
              label="Use this address for payment details"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
            Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
