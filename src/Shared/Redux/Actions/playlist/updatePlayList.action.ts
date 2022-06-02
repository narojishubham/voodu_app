
import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { PlaylistListEachResType, UpdatePlaylistProps } from "../../../../Interface/plalistInterface";
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
    
  return axiosResHandle(res)
};
const updatePlaylistAction = createAsyncThunk('playlist/update', async (props: UpdatePlaylistProps, thunkAPI) => {
  try {
    console.log("in updatePlaylistAction, ", {props});
    return await updatePlaylistService(props);
  } catch (err) {
    return thunkAPI.rejectWithValue(axiosErrHandle(err));
  }
});
export default updatePlaylistAction