import { createAsyncThunk } from "@reduxjs/toolkit"
import { PlaylistItemDeleteResType } from "../../../interface/playlistInterface"
import server from "../../api"
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle"

interface deletePlaylistItemTypes{
    _id:number
}

const deletePlaylistItemService =async ({_id}:deletePlaylistItemTypes) => {
    const res = await server
    .delete<PlaylistItemDeleteResType>(`/playlists/${_id}`)
    return axiosResOutput(res)
}
const deletePlaylistItemAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      return await deletePlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default deletePlaylistItemAction