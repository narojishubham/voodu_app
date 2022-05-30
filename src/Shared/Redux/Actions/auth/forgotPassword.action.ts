import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle } from "../../../../api/axiosHandle";

interface IforgotPassword {
    email: string;
}
const forgotPasswordService = ({ email }: IforgotPassword) => {
    return server.post("/session/forgot_password", {
        email,
    });
};

const forgotPasswordAction = createAsyncThunk("forgot/password", async (props: IforgotPassword, thunkAPI) => {
    try {
        console.log("in forgotPasswordAction, ", { props });
        return await forgotPasswordService(props);
    } catch (err) {
        return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
});

export default forgotPasswordAction;
