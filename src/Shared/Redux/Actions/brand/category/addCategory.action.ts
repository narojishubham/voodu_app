import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";
import { GetCategoriesResponseType } from "./getCategory.action";

export type AddCategoriesParamsType = {
    newCategory: string;
};

const addCategoriesService = (data: AddCategoriesParamsType) => {
    return server.post<GetCategoriesResponseType>("/session/addCategory", data);
};

const addCategoriesAction = createAsyncThunk(
    "brand/category/add",
    async (params: AddCategoriesParamsType, { rejectWithValue }) => {
        try {
            const res = await addCategoriesService(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default addCategoriesAction;
