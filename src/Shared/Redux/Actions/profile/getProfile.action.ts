import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export type ProfileRespType = {
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
            poster: {
                id: number;
                accountId: number;
                userId: number;
                width: number;
                height: number;
                size: number;
                duration: any;
                filename: string;
                key: string;
                processed: any;
                valid: boolean;
                verificationError: any;
                variations: any;
                createdAt: string;
                updatedAt: string;
                urls: {
                    original: string;
                };
            };
            category: {
                id: number;
                name: string;
                createdAt: string;
                updatedAt: string;
            };
            designationData: {
                id: number;
                name: string;
                createdAt: string;
                updatedAt: string;
            };
        };
    };
};

export const getProfileDataService = () => {
    return server.get<ProfileRespType>("/account/user_profile", {});
};
const getProfileDataAction = createAsyncThunk("profile/user/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getProfileDataService();
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getProfileDataAction;
