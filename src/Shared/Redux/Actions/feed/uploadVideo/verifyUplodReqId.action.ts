import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

interface VerifyUploadReqProps {
  uploadReqIdRes: number;
}
export type VerifyUploadReqResponseType={
  id: number
  accountId: number
  userId: number
  width: any
  height: any
  size: any
  duration: any
  filename: string
  key: string
  processed: any
  valid: boolean
  verificationError: string
  variations: any
  createdAt: string
  updatedAt: string
  urls: {
    original: string
  }
}
const verifyUploadReqService = (id:VerifyUploadReqProps) => {
  return (server.post( `/resources/${id}/verify` ))
};
export const verifyUploadReqAction = createAsyncThunk('video/verifyUploadReq', async (props: VerifyUploadReqProps, thunkAPI) => {
  // const { uploadReqIdRes } = props;
  try {
    const response = await verifyUploadReqService(props);
             console.log('3333 verifyUploadReqAction',response)
return axiosResHandle(response)
  } catch (error: any) {
    return axiosErrHandle(error);
  }
});