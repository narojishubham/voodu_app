
import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle } from "../../../../api/axiosHandle";
import { PlaylistLayoutType, PlaylistOrientation } from "../../../Models/enums/playlist";
import { PlaylistListEachResType, UpdatePlaylistProps, VideoEntityType } from "../../../Models/Playlist/playlist.type";

type updatePlaylistTypes = {

  title: string,
  videos: VideoEntityType[],
  integrationType: PlaylistLayoutType,
  orientation: PlaylistOrientation,
  id:number
// data:any,
// id:number
}


const updatePlaylistService = (data: updatePlaylistTypes) => {
const arr = Object.entries(data).filter(([key,val]) => key !== "id");
const obj  = Object.fromEntries(arr)
  return (server.patch<PlaylistListEachResType>(`/playlists/${data.id}`, obj))
};
const updatePlaylistAction = createAsyncThunk('playlist/update', async (props: updatePlaylistTypes, thunkAPI) => {
  try {
    console.log("in updatePlaylistAction, ", { props });
    return await updatePlaylistService(props);
  } catch (err) {
    return thunkAPI.rejectWithValue(axiosErrHandle(err));
  }
});
export default updatePlaylistAction