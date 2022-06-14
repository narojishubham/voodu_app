import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../../api/axiosHandle";

interface GetVideoThumbnailResponse {
  data?: {
    accountId?: number;
    userId?: number;
    filename?: string;
    key?: string;
    valid?: boolean;
    id?: number;
    urls?: {
      original?: string;
    };
  };
}
type getVideoThumbnail ={
  file: string
}
const getVideoThumbnailService = ({file}:getVideoThumbnail) => {
  console.log({ file });
  return server.post<GetVideoThumbnailResponse>('/resources/snapShot', { file })
};
export const getVideoThumbnailAction = createAsyncThunk(
    'video/uploadUsingReqId',
    async (props: getVideoThumbnail,  thunkAPI) => {
        const { file } = props;
        try {
            const response = await getVideoThumbnailService({  file });
             console.log('getVideoThumbnailAction',response)

            return axiosResHandle(response)
        } catch (error: any) {
            return axiosErrHandle(error);
        }
    }
);
