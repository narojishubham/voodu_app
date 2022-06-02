import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

const getDesignationService = () => {
    return server.get("/session/designations");
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
