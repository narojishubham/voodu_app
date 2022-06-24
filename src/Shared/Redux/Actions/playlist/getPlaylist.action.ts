import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { getPlaylist, PlaylistItemType } from "../../../Models/Playlist/playlist.type";

const getPlaylistService =async ({playlistId}:getPlaylist) => {
  const res = await server
  .get<PlaylistItemType>(`/playlists/${playlistId}`, {
  })
  // console.log(" getPlaylistService, ", {res});
  return axiosResHandle(res)
}
const getPlaylistAction = createAsyncThunk('getplaylists/item', async (props: getPlaylist, thunkAPI) => {
  try {
    // console.log("getPlaylistAction, ", { props});
    return await getPlaylistService({playlistId:props.playlistId});
  } catch (err) {
    return thunkAPI.rejectWithValue(axiosErrHandle(err));
  }
});
export default getPlaylistAction