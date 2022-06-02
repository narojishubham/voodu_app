import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle } from "../../../../api/axiosHandle";

type UpdateProfileData = {
    posterId: string;
    description: string;
    firstName: string;
    lastName: string;
    designationId: number;
};
export const uploadProfileDataService = (data: UpdateProfileData) => {
    return server.patch("/account");
};
const uploadProfileDataAction = createAsyncThunk(
    "profile/user/upload",
    async (props: UpdateProfileData, { rejectWithValue }) => {
        try {
            console.log("getPlaylistAction, ", { props });
            return await uploadProfileDataService(props);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default uploadProfileDataAction;
