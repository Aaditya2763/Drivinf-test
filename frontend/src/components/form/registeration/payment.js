import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function PaymentForm({ validateDocumentData }) {
  const [userPhoto, setUserPhoto] = React.useState(null);
  const [adharCard, setAdharCard] = React.useState(null);

  const handleUserPhotoChange = (event) => {
    const file = event.target.files[0];
   
    // Check if a file is selected
    if (file) {
      // Convert the selected file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // You can perform additional actions here, such as validation or updating the parent component state
  };

  const handleAdharCardChange = (event) => {
    const file = event.target.files[0];
   
    // Check if a file is selected
    if (file) {
      // Convert the selected file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdharCard(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // You can perform additional actions here, such as validation or updating the parent component state
  };

  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Documents
      </Typography>
      <Grid container spacing={3}  sx={{ 
    display: { xs: 'flex', alignItems: "center", padding: 10 },
    justifyContent: "space-around" // Adjusted to justifyContent
  }}>
        <Grid item xs={12} md={6}>
          <label htmlFor="user-photo-upload">Upload user photo</label>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload Photo
            <VisuallyHiddenInput
              id="user-photo-upload"
              type="file"
              onChange={handleUserPhotoChange}
            />
          </Button>
          {userPhoto && <img src={userPhoto} style={{width:100,height:100,margin:10}}/>
}
        </Grid>
        <Grid item xs={12} md={6}>
          <label htmlFor="adhar-card-upload">Upload Adhar card</label>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload Adhar
            <VisuallyHiddenInput
              id="adhar-card-upload"
              type="file"
              onChange={handleAdharCardChange}
            />
          </Button>
          {adharCard &&           <img src={adharCard} style={{width:100,height:100,margin:10,}}/>
}
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}
