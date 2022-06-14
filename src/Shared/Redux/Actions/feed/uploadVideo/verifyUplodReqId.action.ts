import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

interface VerifyUploadReqProps {
  uploadReqIdRes?: number;
}

const verifyUploadReqService = (id?:number) => {
  return server
    .post(
      `/resources/${id}/verify`,{},
    )
};
export const verifyUploadReqAction = createAsyncThunk('video/verifyUploadReq', async (props: VerifyUploadReqProps, thunkAPI) => {
  const { uploadReqIdRes } = props;
  try {
    const response = await verifyUploadReqService(uploadReqIdRes);
             console.log('3333 verifyUploadReqAction',response)
return axiosResHandle(response)
  } catch (error: any) {
    return axiosErrHandle(error);
  }
});