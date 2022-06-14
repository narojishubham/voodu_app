import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

type GetBrandTagsServiceResType =  {
    data: {
        id: number;
        accountId: number;
        value: string;
    }[]
}

export const getBrandTagsService = () => {
    return server.get<GetBrandTagsServiceResType>("/tags");
};
const getBrandTagsAction = createAsyncThunk("feed/tags/get", async (_, { rejectWithValue }) => {
    try {
        const res = await getBrandTagsService();
        // console.log({getBrandTagsAction: res});
        
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getBrandTagsAction;
