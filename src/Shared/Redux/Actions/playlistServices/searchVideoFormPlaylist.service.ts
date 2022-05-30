// const searchVideosFromPlaylist = (playlistID: any, searchQuery: string) => {
//     return axiosRequest
//       .get(`/playlists/${playlistID}?q=${searchQuery}`, {
//         // headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response: AxiosResponse<PlaylistItemResType>) => response.data);

import { createAsyncThunk } from "@reduxjs/toolkit"
import { PlaylistItemResType } from "../../../interface/playlistInterface"
import server from "../../api"
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle"


interface IsearchVideoFromPlaylist {
    playlistID: any, searchQuery: string
} 

const searchVideosFromPlaylistService = async ({searchQuery,playlistID}:IsearchVideoFromPlaylist) =>{
    const res = await server
    .get<PlaylistItemResType>(`/playlists/${playlistID}?q=${searchQuery}`, {
                // headers: { Authorization: `Bearer ${token}` },
              })
              return axiosResOutput(res)
}
const searchVideosFromPlaylistAction = createAsyncThunk('playlists/items',async(props:IsearchVideoFromPlaylist, thunkAPI)=>{
    try{
        return await searchVideosFromPlaylistService(props)
    }catch(err){
        return thunkAPI.rejectWithValue(catchErrorHandle(err)); 
    }
})
export default searchVideosFromPlaylistAction