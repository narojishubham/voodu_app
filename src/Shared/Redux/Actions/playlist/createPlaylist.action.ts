import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { CreatePlaylistPropsType, CreatePlaylistResponse } from "../../../../Interface/plalistInterface";

// const createPlaylist = (
//     data: CreatePlaylistProps
//   ): Promise<AxiosResponse<PlaylistListEachResType>> => {
//     return axiosRequest.post("/playlists", data, {
//     //   headers: { Authorization: `Bearer ${token}` },
//     });
//   };

  const createPlaylistServices = async ({title,videos,state,integrationType}:CreatePlaylistPropsType) => {
    const res = await server
    .post<CreatePlaylistResponse>("/playlists",{title,videos,state,integrationType})
    return axiosResHandle(res)
  }

  const createPlaylistAction = createAsyncThunk('auth/login', async (props: CreatePlaylistPropsType, thunkAPI) => {
    try {
      console.log("in loginAction, ", {props});
      return await createPlaylistServices(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(axiosErrHandle(err));
    }
  });

  export default createPlaylistAction

  // const getAllVideosFeed = ({
  //   page,
  //   q,
  //   itemsPerPage,
  //   orientation,
  // }: IGetAllVideosFeed) => {
  //   return axiosRequest
  //     .get("/videos", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: { page, itemsPerPage, q, orientation },
  //     })
  //     .then((response: AxiosResponse<AllVideosItems>) => response.data);
  // };



  // const createPlaylistService ={
  //     createPlaylist,
  //     getAllVideosFeed
  // }
  // export default createPlaylistService