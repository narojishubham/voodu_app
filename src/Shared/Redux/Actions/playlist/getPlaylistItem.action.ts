import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { GetPlaylistTypes, PlaylistItemDeleteResType } from "../../../../Interface/plalistInterface";


  const getPlaylistItemService =async ({id, page = 1}:GetPlaylistTypes) => {
    const res = await server
    .get<PlaylistItemDeleteResType>(`/playlists/${id}?page=${page}`, {
      // headers: { Authorization: `Bearer ${token}` },
    })
    console.log(" getPlaylistService, ", {res});
    
    return axiosResHandle(res)
  }

  const getPlaylistAction = createAsyncThunk('playlists/item', async (props: any, thunkAPI) => {
    try {
      console.log("getPlaylistAction, ", {props});
      return await getPlaylistItemService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default getPlaylistAction


  