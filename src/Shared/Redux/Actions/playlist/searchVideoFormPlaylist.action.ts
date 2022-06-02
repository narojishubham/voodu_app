// const searchVideosFromPlaylist = (playlistID: any, searchQuery: string) => {
//     return axiosRequest
//       .get(`/playlists/${playlistID}?q=${searchQuery}`, {
//         // headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response: AxiosResponse<PlaylistItemResType>) => response.data);

import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemDeleteResType, SearchVideoFromPlaylist } from "../../../../Interface/plalistInterface"

const searchVideosFromPlaylistService = async ({searchQuery,playlistID}:SearchVideoFromPlaylist) =>{
    const res = await server
    .get<PlaylistItemDeleteResType>(`/playlists/${playlistID}?q=${searchQuery}`, {
                // headers: { Authorization: `Bearer ${token}` },
              })
              return axiosResHandle(res)
}
const searchVideosFromPlaylistAction = createAsyncThunk('playlists/items',async(props:SearchVideoFromPlaylist, thunkAPI)=>{
    try{
        return await searchVideosFromPlaylistService(props)
    }catch(err){
        return thunkAPI.rejectWithValue(axiosErrHandle(err)); 
    }
})
export default searchVideosFromPlaylistAction