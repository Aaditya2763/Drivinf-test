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