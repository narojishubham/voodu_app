import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";

interface IsearchParams {
    searchQuery:string,
page:number 
}

const searchPlaylistListService = async({searchQuery, page = 1}:IsearchParams) => {
  
    const res = await server
      .get(`/playlists?q=${searchQuery}&page=${page}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
return axiosResOutput(res)  
};
const searchPlaylistListAction = createAsyncThunk('auth/login', async (props: IsearchParams, thunkAPI) => {
    try {
      console.log("in loginAction, ", {props});
      return await searchPlaylistListService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
    }
  });
  export default searchPlaylistListAction