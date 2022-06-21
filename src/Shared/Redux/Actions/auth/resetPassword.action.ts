import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

type ResetPasswordParamsType = {
    token: string;
    password: string;
    confirmPassword: string;
};

const resetPasswordService = (data: ResetPasswordParamsType) => {
    return server.post("/session/reset_password", data);
};

const resetPasswordAction = createAsyncThunk(
    "auth/reset-password",
    async (params: ResetPasswordParamsType, { rejectWithValue }) => {
        try {
            const res = await resetPasswordService(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default resetPasswordAction;
