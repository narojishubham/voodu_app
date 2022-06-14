import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

interface createUploadRequest {
    filename?: string
}
interface CreateUploadRequestResponse {
  data: {
    accountId?: number;
    userId?: number;
    filename?: string;
    key?: string;
    id?: number;
    uploadUrl?: string;
    urls?: {
      original?: string;
    };
  };
}
const createUploadRequestService = ({filename}: createUploadRequest) => {
  return server
    .post<CreateUploadRequestResponse>(
      '/resources/request',{filename})
};
const createUploadRequestAction = createAsyncThunk(
    "brand/category/add",
    async (params: createUploadRequest, { rejectWithValue }) => {
        try {
            const res = await createUploadRequestService(params);
             console.log(' 111 data test createUploadRequestService',res)
            return axiosResHandle(res);
           
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
export default createUploadRequestAction;
