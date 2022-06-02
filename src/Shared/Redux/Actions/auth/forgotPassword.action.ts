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
    async (params: ForgotPasswordParamsType, thunkAPI) => {
        try {
            const res = await forgotPasswordService(params);
            return axiosResHandle(res);
        } catch (err) {
            return thunkAPI.rejectWithValue(axiosErrHandle(err));
        }
    }
);

export default forgotPasswordAction;
