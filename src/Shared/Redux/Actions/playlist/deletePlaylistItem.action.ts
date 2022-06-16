import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemDeleteResType } from "../../../Models/Playlist/playlist.type"

type deletePlaylistItemTypes ={
    _id:number
}

const deletePlaylistItemService =async ({_id}:deletePlaylistItemTypes) => {
   return( server.delete(`/playlists/${_id}`))
}
const deletePlaylistItemAction = createAsyncThunk('delete/playlists/', async (props: deletePlaylistItemTypes, thunkAPI) => {
    try {
      return await deletePlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default deletePlaylistItemAction