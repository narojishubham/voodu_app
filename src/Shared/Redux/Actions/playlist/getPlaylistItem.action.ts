import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { PlaylistItemResType } from "../../../Models/Playlist/playlist.type";

interface GetPlaylistTypes{
  id: number, page?: number
}
  export const getPlaylistItemService = (params:GetPlaylistTypes) => {
    // console.log('1111  111 id id id id 111 ',id)
    return(server.get<PlaylistItemResType>(`/playlists/${params.id}?page=${params.page}`))}

  const getPlaylistItemAction = createAsyncThunk('playlists/item', async (params: GetPlaylistTypes, thunkAPI) => {
    try {
      // console.log("getPlaylistAction, ", {props});
      const resp = await getPlaylistItemService(params);
      return axiosResHandle(resp);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default getPlaylistItemAction


  