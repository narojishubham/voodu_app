import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { CreatePlaylistPropsType, CreatePlaylistResponse } from "../../../Models/Playlist/playlist.type";
// with async await
  // const createPlaylistServices = async (data:CreatePlaylistPropsType) => {
  //   const res = await server
  //   .post<CreatePlaylistResponse>("/playlists",data)
  //   return axiosResHandle(res)
  // }
  const createPlaylistServices =  (data:CreatePlaylistPropsType) => {

  return(server.post<CreatePlaylistResponse>("/playlists",data))
  }
  const createPlaylistAction = createAsyncThunk('auth/createPlaylist', async (props: CreatePlaylistPropsType, thunkAPI) => {
    // try {
    //   // console.log("in loginAction, ", {params});
    //   return await createPlaylistServices(params);
    // } catch (err) {
    //   return thunkAPI.rejectWithValue(axiosErrHandle(err));
    // }
    try{
      const resp = await createPlaylistServices(props)
      // return await createPlaylistServices(props)
      return(axiosResHandle(resp))
    }catch(err){
        return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });

  export default createPlaylistAction
