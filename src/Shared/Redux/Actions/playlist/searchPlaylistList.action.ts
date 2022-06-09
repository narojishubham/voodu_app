import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
export interface SearchParams {
    searchQuery?:string,
page?:number 
}

const searchPlaylistListService = async({searchQuery, page = 1}:SearchParams) => {
  
    const res = await server
      .get(`/playlists?q=${searchQuery}&page=${page}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
return axiosResHandle(res)  
};
const searchPlaylistListAction = createAsyncThunk('auth/login', async (props: SearchParams, thunkAPI) => {
    try {
      console.log("in loginAction, ", {props});
      return await searchPlaylistListService(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });
  export default searchPlaylistListAction