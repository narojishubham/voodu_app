import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";

export interface LoginParamsType {
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
    //   try {
    //     const res = await loginService(params);
    //         return(console.log('axiosResHandle: ',axiosResHandle(res)))
    // } catch (err) {
    //     console.log('axiosErrHandle: ',axiosErrHandle(err))
    //     return rejectWithValue(axiosErrHandle(err))
    // }
});
export default loginAction;
