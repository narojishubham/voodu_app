import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";

interface IgetPlaylist{
  playlistId:number
}

const getPlaylistService =async ({playlistId}:IgetPlaylist) => {
  const res = await server
  .get(`/playlists/${playlistId}`, {
    // headers: { Authorization: `Bearer ${token}` },
  })
  console.log(" getPlaylistService, ", {res});
  
  return axiosResOutput(res)
}

const getPlaylistAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
  try {
    console.log("getPlaylistAction, ", {props});
    return await getPlaylistService(props);
  } catch (err) {
    return thunkAPI.rejectWithValue(catchErrorHandle(err));
  }
});
export default getPlaylistAction