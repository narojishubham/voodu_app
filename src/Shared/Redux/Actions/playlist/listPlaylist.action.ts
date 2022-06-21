import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

const listPlaylistService =async () => {
    const res = await server
    .get("/playlists", {})
    return axiosResHandle(res)
}
const listPlaylistAction = createAsyncThunk('playlists/item', async (_, thunkAPI) => {
    try {
      return await listPlaylistService();
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default listPlaylistAction