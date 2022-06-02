import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

  interface IgetVideoById{
    id:number
  }

  const getVideoByIdService =async ({id}:IgetVideoById) => {
    const res = await server
    .get(`/videos/${id}`, {
      // headers: { Authorization: `Bearer ${token}` },
    })
    console.log(" getVideoByIdService, ", {res});
    
    return axiosResHandle(res)
  }

  const getVideoByIdAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      console.log("getVideoByIdAction, ", {props});
      return await getVideoByIdService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default getVideoByIdAction