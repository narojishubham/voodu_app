import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle, axiosResErrNoRes } from "../../../../api/axiosHandle";
import { LoginResTypes } from "../../../Models/Auth/login.types";

export interface LoginParamsType {
    email: string;
    password: string;
}

export const loginService = (data: LoginParamsType) => {
    return (server.post<LoginResTypes>("/session/login", data))
};
const loginAction = createAsyncThunk("auth/login", async (params: LoginParamsType, { rejectWithValue }) => {
    try {
        const res = await loginService(params);
        return axiosResHandle(res);
    } catch (err:any) {

        // return rejectWithValue(axiosResErrNoRes(err));
        return rejectWithValue(err.response.data.message)
    }
});
export default loginAction;
