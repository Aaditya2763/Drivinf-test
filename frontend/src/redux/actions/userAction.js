import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// Register action
export const drivingTestRegistration = createAsyncThunk(
    "user/drivingTestRegistration",
  
    async (user, { rejectWithValue }) => {
  
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
//   console.log(user)
        const res = await axios.post(`${baseUrl}/test-registration`, user, config);
        return res.data;
        console.log(res)
      } catch (error) {
        
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//update userProfile image Action
  export const updateUserProfilePhotoAction = createAsyncThunk(
    "user/updateprofileImg",
    async ({id , image}, { rejectWithValue }) => {
      console.log(id,image)
      try {
        const formData = new FormData();
        formData.append("id", id); // Append key-value pair for id
        formData.append("image",image); // Append key-value pair for image
  
        const res = await axios.put(`${baseUrl}/update-profile-photo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        // Update local storage
        const existingData = localStorage.getItem('userData');
        const existingObject = existingData ? JSON.parse(existingData) : {};
        existingObject.profilePhoto = res.data;
        localStorage.setItem('userData', JSON.stringify(existingObject));
  
        return res.data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  