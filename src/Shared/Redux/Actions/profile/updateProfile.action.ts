import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

type UpdateProfileData = {
    posterId: string;
    description: string;
    firstName: string;
    lastName: string;
    designationId: number;
};
export const uploadProfileDataService = (data: UpdateProfileData) => {
    return server.patch("/account",data);
};
const uploadProfileDataAction = createAsyncThunk(
    "profile/user/upload",
    async (props: UpdateProfileData, { rejectWithValue }) => {
        try {
            // console.log("uploadProfileDataAction, ", { props });
             const res = await uploadProfileDataService(props);
             return axiosResHandle(res)
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default uploadProfileDataAction;
