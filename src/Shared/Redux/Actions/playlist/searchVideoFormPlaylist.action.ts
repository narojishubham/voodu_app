import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemResType } from "../../../Models/Playlist/playlist.type"

interface SearchVideoFromPlaylist {
    playlistID: number, searchQuery: string
} 
export const searchVideosFromPlaylistService = async ({searchQuery,playlistID}:SearchVideoFromPlaylist ) =>{
  return (server.get<PlaylistItemResType>(`/playlists/${playlistID}?q=${searchQuery}`))
}
const searchVideosFromPlaylistAction = createAsyncThunk('playlists/items',async(props:SearchVideoFromPlaylist, thunkAPI)=>{
    try{
        return await searchVideosFromPlaylistService(props)
    }catch(err){
        return thunkAPI.rejectWithValue(axiosErrHandle(err)); 
    }
})
export default searchVideosFromPlaylistAction