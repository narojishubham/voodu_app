import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaylistListResType } from "../../../interface/playlistInterface";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";

// const getPlaylistList = (page: number = 1) => {
//     return axiosRequest
//       .get(`/playlists?page=${page}`, {
//         // headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response: AxiosResponse<PlaylistListResType>) => response.data);
//   };
  const getPlaylistListService = async(page: number = 1)=>{
    const res = await server
    .get<PlaylistListResType>(`/playlists?page=${page}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      console.log(" getPlaylistListService, ", {res});
    
      return axiosResOutput(res)
    }

    const getPlaylistListAction = createAsyncThunk('playlists/page', async (props: any, thunkAPI) => {
        try {
          console.log("getPlaylistAction, ", {props});
          return await getPlaylistListService(props);
        } catch (err) {
          return thunkAPI.rejectWithValue(catchErrorHandle(err));
        }
      });
      export default getPlaylistListAction