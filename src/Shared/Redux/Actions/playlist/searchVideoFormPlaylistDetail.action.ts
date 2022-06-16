import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../../../api"
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle"
import { PlaylistItemResType, PlaylistItemType } from "../../../Models/Playlist/playlist.type"

interface SearchVideoFromPlaylist {
    playlistID: number, searchQuery: string
} 
export const searchVideosFromPlaylistDetailService = async ({searchQuery,playlistID}:SearchVideoFromPlaylist ) =>{
  const res =  await(server.get(`/playlists/${playlistID}?q=${searchQuery}`))
  return axiosResHandle(res)
}
const searchVideosFromPlaylistAction = createAsyncThunk('playlists/items',async(props:SearchVideoFromPlaylist, thunkAPI)=>{
    try{
        return await searchVideosFromPlaylistDetailService(props)
    }catch(err){
        return thunkAPI.rejectWithValue(axiosErrHandle(err)); 
    }
})
export default searchVideosFromPlaylistAction