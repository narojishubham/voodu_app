import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
interface DeleteVideoResponse {
  data?: number;
}
type deleteVideoType ={
  id: number
}

export const deleteVideoService = async ({id}:deleteVideoType) => {
    // try {
    //     const response = await server.delete<DeleteVideoResponse>(`/videos/${id}`);
    //     return axiosResHandle(response);
    // } catch (err) {
    //     return axiosErrHandle(err);
    // }
    return(server.delete<DeleteVideoResponse>(`/videos/${id}`))
};
const deleteVideoAction = createAsyncThunk('delete/videolibrary/video',async(props:deleteVideoType, thunkAPI) =>{
     try {
      return await deleteVideoService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
})
  export default deleteVideoAction
