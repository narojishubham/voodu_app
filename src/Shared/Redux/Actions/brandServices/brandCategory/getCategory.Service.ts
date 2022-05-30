import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../../../axios/axiosRequest";
import { catchErrorHandle } from "../../../api/axiosHandle";
export interface GetCategoriesResponseType {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}
const getCategoriesService = (): any => {
    return axiosRequest.get<GetCategoriesResponseType>('/session/categories').then((response) => {
      return response;
    });
  };
  const getCategoriesAction = createAsyncThunk('auth/getCategories', async (_, thunkAPI) => {
    try {
      return await getCategoriesService();
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });


  export default getCategoriesAction