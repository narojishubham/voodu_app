import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosRequest from "../../../axios/axiosRequest";
import { AccData } from "../../../features/authSlice/authSlice";
import { CreatePlaylistProps } from "../../../features/playlistSlice/playlistSlice";
import { AllVideosItems, IGetAllVideosFeed, PlaylistListEachResType } from "../../../interface/playlistInterface";
import { PlaylistLayoutType } from "../../../utils/enums/playlist";
import server from "../../api";
import { axiosResOutput, catchErrorHandle } from "../../api/axiosHandle";

const token: AccData["token"] = JSON.parse(
    localStorage.getItem("token") || "null"
  );  

  export interface CreatePlaylistPropsType {
    title?: string;
    videos?: { id: string }[] | { id: number }[];
    state?: string;
    integrationType?: PlaylistLayoutType;
  }
  interface CreatePlaylistResponse {
    title?: string;
    accountId?: number;
    state?: string;
    videos?: string[];
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    integrationId?: string;
  }

// const createPlaylist = (
//     data: CreatePlaylistProps
//   ): Promise<AxiosResponse<PlaylistListEachResType>> => {
//     return axiosRequest.post("/playlists", data, {
//     //   headers: { Authorization: `Bearer ${token}` },
//     });
//   };

  const createPlaylistServices = async ({title,videos,state,integrationType}:CreatePlaylistProps) => {
    const res = await server
    .post<CreatePlaylistResponse>("/playlists",{title,videos,state,integrationType})
    return axiosResOutput(res)
  }


  const createPlaylistAction = createAsyncThunk('auth/login', async (props: CreatePlaylistProps, thunkAPI) => {
    try {
      console.log("in loginAction, ", {props});
      return await createPlaylistServices(props);
    } catch (err) {
      return thunkAPI.rejectWithValue(catchErrorHandle(err));
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