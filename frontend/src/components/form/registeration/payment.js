import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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
export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Documents
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* <Label>Upload user photo</Label> */}
          <label>Upload user photo</label>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload Photo
      <VisuallyHiddenInput type="file" />
    </Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <label>Upload Adhar card</label>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload Adhar 
      <VisuallyHiddenInput type="file" />
    </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{width:200,height:150,border:"1px solid black"}}
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{width:200,height:150,border:"1px solid black"}}
            
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: 'none' }}
          />
         
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
