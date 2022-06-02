import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosRequest from "../../../axios/axiosRequest";
import { PlaylistItemDeleteResType, PlaylistItemResType, PlaylistListResType } from "../../../interface/playlistInterface";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";


interface IgetPlaylistTypes{
  id: string, page: number
}
 
  const getPlaylistItemService =async ({id, page = 1}:IgetPlaylistTypes) => {
    const res = await server
    .get<PlaylistItemResType>(`/playlists/${id}?page=${page}`, {
      // headers: { Authorization: `Bearer ${token}` },
    })
    console.log(" getPlaylistService, ", {res});
    
    return axiosResOutput(res)
  }

  const getPlaylistAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      console.log("getPlaylistAction, ", {props});
      return await getPlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default getPlaylistAction


  