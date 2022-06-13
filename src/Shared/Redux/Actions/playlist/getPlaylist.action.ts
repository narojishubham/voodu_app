import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { getPlaylist } from "../../../Models/Playlist/playlist.type";

const getPlaylistService =async ({playlistId}:getPlaylist) => {
  const res = await server
  .get(`/playlists/${playlistId}`, {
  })
  console.log(" getPlaylistService, ", {res});
  return axiosResHandle(res)
}
const getPlaylistAction = createAsyncThunk('playlists/item', async (props: getPlaylist, thunkAPI) => {
  try {
    console.log("getPlaylistAction, ", { props});
    return await getPlaylistService({playlistId:props.playlistId});
  } catch (err) {
    return thunkAPI.rejectWithValue(axiosErrHandle(err));
  }
});
export default getPlaylistAction