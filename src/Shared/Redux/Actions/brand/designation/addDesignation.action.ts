import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

export type DesignationResponseType = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};
export type AddDesignationsParamsType = {
    designation: string;
};
const addDesignationService = (data: AddDesignationsParamsType) => {
    return server.post<DesignationResponseType>("/session/addDesignation", data);
};

const addDesignationAction = createAsyncThunk(
    "brand/designation/add",
    async (params: AddDesignationsParamsType, { rejectWithValue }) => {
        try {
            const res = await addDesignationService(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default addDesignationAction;
