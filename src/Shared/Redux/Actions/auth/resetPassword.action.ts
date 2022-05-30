import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setMessage } from "../../../features/messageSlice/messageSlice";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";

interface IresetPassword {
    token?: string;
    password?: string;
    confirmPassword?: string;
}

const resetPasswordService = ({ token, password, confirmPassword }: IresetPassword) => {
    return server.post("/session/reset_password", {
        token,
        password,
        confirmPassword,
    });
};

const resetPasswordAction = createAsyncThunk("reset/password", async (props: IresetPassword, thunkAPI) => {
    try {
        return await resetPasswordService(props);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export default resetPasswordAction;
