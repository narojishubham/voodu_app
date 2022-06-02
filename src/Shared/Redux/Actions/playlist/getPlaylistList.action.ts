import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { PlaylistListResType } from "../../../../Interface/plalistInterface";

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
    
      return axiosResHandle(res)
    }

    const getPlaylistListAction = createAsyncThunk('playlists/page', async (props: any, thunkAPI) => {
        try {
          console.log("getPlaylistAction, ", {props});
          return await getPlaylistListService(props);
        } catch (err) {
          return thunkAPI.rejectWithValue(axiosErrHandle(err));
        }
      });
      export default getPlaylistListAction