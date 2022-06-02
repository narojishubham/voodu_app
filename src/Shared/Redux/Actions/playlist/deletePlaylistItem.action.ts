import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemDeleteResType } from "../../../../Interface/plalistInterface"

type deletePlaylistItemTypes ={
    _id:number
}

const deletePlaylistItemService =async ({_id}:deletePlaylistItemTypes) => {
    const res = await server
    .delete<PlaylistItemDeleteResType>(`/playlists/${_id}`)
    return axiosResHandle(res)
}
const deletePlaylistItemAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      return await deletePlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default deletePlaylistItemAction