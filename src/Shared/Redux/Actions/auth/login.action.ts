import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";
import { LoginResTypes } from "../../../Models/Auth/login.types";

export interface LoginParamsType {
    email: string;
    password: string;
}

const loginService = (data: LoginParamsType) => {
    return (server.post<LoginResTypes>("/session/login", data))
};
const loginAction = createAsyncThunk("auth/login", async (params: LoginParamsType, { rejectWithValue }) => {
    try {
        const res = await loginService(params);
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default loginAction;
