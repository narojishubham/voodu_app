
import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle } from "../../../../api/axiosHandle";
import { PlaylistLayoutType, PlaylistOrientation } from "../../../Models/enums/playlist";
import { PlaylistListEachResType, UpdatePlaylistProps, VideoEntityType } from "../../../Models/Playlist/playlist.type";

type updatePlaylistTypes = {
data:{
  title: string,
  videos: VideoEntityType[],
  integrationType: PlaylistLayoutType,
  orientation: PlaylistOrientation,
}
id:number
}
// const updatePlaylistService = ({id,tittle,video,integrationType,orientation}:updatePlaylistTypes) => {

const updatePlaylistService = (params: updatePlaylistTypes) => {
  return (server.post<PlaylistListEachResType>(`/playlists/${params.id}`, params.data))
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