import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../../../axios/axiosRequest";
import { catchErrorHandle } from "../../../api/axiosHandle";

const getDesignationsService = (): any => {
    return axiosRequest.get('/session/designations').then((response) => {
      return response;
    });
  };
  
  const getDesignationsAction = createAsyncThunk('auth/getDesignations', async (_, thunkAPI) => {
    try {
      return await getDesignationsService();
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
export default getDesignationsAction