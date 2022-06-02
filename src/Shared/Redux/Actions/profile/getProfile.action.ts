import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const getProfileDataService = () => {
    return server.get("/account/user_profile", {});
};
const getProfileDataAction = createAsyncThunk("profile/user/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getProfileDataService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getProfileDataAction;
