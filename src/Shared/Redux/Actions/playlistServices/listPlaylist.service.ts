import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";

const listPlaylistService =async () => {
    const res = await server
    .get("/playlists", {})
    return axiosResOutput(res)
}
const listPlaylistAction = createAsyncThunk('playlists/item', async (_, thunkAPI) => {
    try {
      return await listPlaylistService();
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default listPlaylistAction