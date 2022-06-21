import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

export type GetDesignationResponseType = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};
const getDesignationService = () => {
    return server.get<GetDesignationResponseType>("/session/designations");
};

const getDesignationsAction = createAsyncThunk("brand/designation/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getDesignationService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getDesignationsAction;
   // const uniqueKey = `token_${payload?.data.accountId}`