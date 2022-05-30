import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";

export interface LoginParamsTypes {
    email: string;
    password: string;
}
export type LoginResTypes = {
    data: {
        id: number;
        accountId: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        state: string;
        createdAt: string;
        updatedAt: string;
        account: {
            id: number;
            name: string;
            website: string;
            contactPerson: string;
            contactEmail: string;
            contactPhone: string;
            state: string;
            createdAt: string;
            updatedAt: string;
            brandCategory: any;
            designation: any;
            categoryId: number;
            designationId: number;
            posterId: number;
            qrCode: string;
            description: string;
        };
    };
    token: string;
};
const loginService = ({ email, password }: LoginParamsTypes) => {
    return server.post<LoginResTypes>("/session/login", {
        email,
        password,
    });
};
const loginAction = createAsyncThunk("auth/login", async (props: LoginParamsTypes, { rejectWithValue }) => {
    try {
        const data = await loginService(props);
        return axiosResHandle(data);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default loginAction;
