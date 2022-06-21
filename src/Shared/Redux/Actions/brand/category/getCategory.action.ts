import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

export type GetCategoriesResponseType = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

const getCategoriesService = () => {
    return server.get<GetCategoriesResponseType>("/session/categories");
};

const getCategoriesAction = createAsyncThunk("brand/category/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getCategoriesService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});

export default getCategoriesAction;
