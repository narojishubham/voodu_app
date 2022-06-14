import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { CreatePlaylistPropsType, CreatePlaylistResponse } from "../../../Models/Playlist/playlist.type";

  const createPlaylistServices = async (params:CreatePlaylistPropsType) => {
    const res = await server
    .post<CreatePlaylistResponse>("/playlists",{params})
    return axiosResHandle(res)
  }

  const createPlaylistAction = createAsyncThunk('auth/login', async (params: CreatePlaylistPropsType, thunkAPI) => {
    try {
      console.log("in loginAction, ", {params});
      return await createPlaylistServices(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });

  export default createPlaylistAction
