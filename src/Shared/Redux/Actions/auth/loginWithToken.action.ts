import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";
import { LoginResTypes } from "../../../Models/Auth/login.types";

export interface LoginParamsType {
    email: string;
    password: string;
}

const loginWithTokenService = () => {
return server.get<LoginResTypes>("/account/user_profile", {});
};
const loginWithTokenAction = createAsyncThunk("auth/loginWithToken", async (_, { rejectWithValue }) => {
    try {
        const res = await loginWithTokenService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default loginWithTokenAction;
