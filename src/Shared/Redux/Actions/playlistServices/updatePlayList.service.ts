
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaylistListEachResType } from "../../../interface/playlistInterface";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";


interface UpdatePlaylistProps {
  id?: number;
  accountId?: number;
  state?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  newVideoArray?: string[];
}
// const updatePlaylist = (
//     id: string,
//     data: any
//   ): Promise<AxiosResponse<PlaylistListEachResType>> => {
//     return axiosRequest.patch(`/playlists/${id}`, data, {
//     //   headers: { Authorization: `Bearer ${token}` },
//     });
//   };

const updatePlaylistService = async ({ id, accountId,state,title,createdAt,updatedAt,newVideoArray }: UpdatePlaylistProps) => {
  const res = await server
    .post<PlaylistListEachResType>(`/playlists/${id}`, {
      id, accountId,state,title,createdAt,updatedAt,newVideoArray 
    })
    console.log("in updatePlaylistService, ", {res});
    
  return axiosResOutput(res)
};
const updatePlaylistAction = createAsyncThunk('playlist/update', async (props: UpdatePlaylistProps, thunkAPI) => {
  try {
    console.log("in updatePlaylistAction, ", {props});
    return await updatePlaylistService(props);
  } catch (err) {
    return thunkAPI.rejectWithValue(catchErrorHandle(err));
  }
});
export default updatePlaylistAction