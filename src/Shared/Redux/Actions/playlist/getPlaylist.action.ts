import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { GetPlaylist } from "../../../../Interface/plalistInterface";

const getPlaylistService =async ({playlistId}:GetPlaylist) => {
  const res = await server
  .get(`/playlists/${playlistId}`, {
    // headers: { Authorization: `Bearer ${token}` },
  })
  console.log(" getPlaylistService, ", {res});
  
  return axiosResHandle(res)
}

const getPlaylistAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
  try {
    console.log("getPlaylistAction, ", {props});
    return await getPlaylistService(props);
  } catch (err) {
    return thunkAPI.rejectWithValue(axiosErrHandle(err));
  }
});
export default getPlaylistAction