import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

type createUploadRequest = {
    uploadUrl: string, file: any
}
export const uploadFileUsingUploadReqIdService = ({ uploadUrl, file }: createUploadRequest) => {
    console.log({'uploadUrl':uploadUrl})
     console.log({'file':file})
    return server
        .put(file, uploadUrl)
};
export const uploadFileUsingUploadReqIdAction = createAsyncThunk(
    'video/uploadUsingReqId',
    async (props: createUploadRequest, thunkAPI) => {
        const { uploadUrl, file } = props;
        try {
            const response = await uploadFileUsingUploadReqIdService({ uploadUrl, file });
            console.log('2222 uploadFileUsingUploadReqIdAction', response)
            return axiosResHandle(response)
        } catch (error: any) {
            return axiosErrHandle(error);
        }
    }
);

