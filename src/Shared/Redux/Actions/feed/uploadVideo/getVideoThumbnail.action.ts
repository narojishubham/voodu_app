import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

export type GetVideoThumbnailResponse = {
 accountId: number
  userId: number
  filename: string
  key: string
  valid: boolean
  id: number
  urls:{
      original: string;
    };
}
type getVideoThumbnail ={
  file: string
}
export const getVideoThumbnailService = ({file}:getVideoThumbnail) => {
  console.log({ file });
  return server.post('/resources/snapShot', { file })
};
export const getVideoThumbnailAction = createAsyncThunk(
    'video/uploadUsingReqId',
    async (props: getVideoThumbnail,  thunkAPI) => {
        const { file } = props;
        try {
            const response = await getVideoThumbnailService({ file });
             console.log('getVideoThumbnailAction',response)
            return axiosResHandle(response)
        } catch (error: any) {
            return axiosErrHandle(error);
        }
    }
);
