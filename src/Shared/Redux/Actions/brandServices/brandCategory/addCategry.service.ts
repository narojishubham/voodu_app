import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../../../axios/axiosRequest";
import { catchErrorHandle } from "../../../api/axiosHandle";
import { GetCategoriesResponseType } from "./getCategory.Service";

export interface AddCategoriesProps {
    newCategory?: string;
  }
  const addCategoriesService = ({newCategory}: AddCategoriesProps) => {
    return axiosRequest.post<GetCategoriesResponseType>('/session/addCategory', {
      newCategory,
    });
  };
  const addCategoriesAction = createAsyncThunk('auth/addCategories', async (props: AddCategoriesProps, thunkAPI) => {
    try {
      console.log("in addCategoriesAction, ", {props});
      return await addCategoriesService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default addCategoriesAction