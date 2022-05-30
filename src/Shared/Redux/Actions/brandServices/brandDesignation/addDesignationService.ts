import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../../../axios/axiosRequest";
import { catchErrorHandle } from "../../../api/axiosHandle";

export interface DesignatResponseType {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface AddDesignationsProps {
  designation?: string;
}
  const addDesignationsService = ({designation}: AddDesignationsProps) => {
    return axiosRequest.post<DesignatResponseType>('/session/addDesignation', {
      designation,
    });
  }; 

  const addDesignationAction = createAsyncThunk('auth/getDesignations', async (props: AddDesignationsProps, thunkAPI) => {
    try {
      console.log("in addCategoriesAction, ", {props});
      return await addDesignationsService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default addDesignationAction