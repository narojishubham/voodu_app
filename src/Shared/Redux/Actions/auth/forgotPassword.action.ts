import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

type ForgotPasswordParamsType = {
    email: string;
};
const forgotPasswordService = (data: ForgotPasswordParamsType) => {
    return server.post<void>("/session/forgot_password", data);
};

const forgotPasswordAction = createAsyncThunk(
    "auth/forgot-password",
    async (params: ForgotPasswordParamsType, {rejectWithValue}) => {
        try {
            const res = await forgotPasswordService(params);
            return axiosResHandle(res);
        } catch (err:any) {
            // return thunkAPI.rejectWithValue(axiosErrHandle(err));
            return rejectWithValue(err.response.data.message)
        }
    }
);

export default forgotPasswordAction;
