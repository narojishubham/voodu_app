import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

  interface getVideoById{
    id:number
  }

  const getVideoByIdService =async ({id}:getVideoById) => {
    const res = await server
    .get(`/videos/${id}`, {
    })
    // console.log(" getVideoByIdService, ", {res});
    return axiosResHandle(res)
  }

  const getVideoByIdAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      // console.log("getVideoByIdAction, ", {props});
      return await getVideoByIdService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default getVideoByIdAction