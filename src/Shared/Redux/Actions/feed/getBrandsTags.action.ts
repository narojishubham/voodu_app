import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const getTagsService = () => {
    return server.get("/tags");
};
const getTagsAction = createAsyncThunk("feed/tags/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getTagsService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getTagsAction;
