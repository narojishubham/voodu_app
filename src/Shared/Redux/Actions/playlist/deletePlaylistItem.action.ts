import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemDeleteResType } from "../../../Models/Playlist/playlist.type"

type deletePlaylistItemTypes ={
    _id:number
}

const deletePlaylistItemService =async ({_id}:deletePlaylistItemTypes) => {
   return( server.delete<PlaylistItemDeleteResType>(`/playlists/${_id}`))
}
const deletePlaylistItemAction = createAsyncThunk('playlists/item', async (props: deletePlaylistItemTypes, thunkAPI) => {
    try {
      return await deletePlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default deletePlaylistItemAction