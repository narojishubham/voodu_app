import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { GetVideos } from "../../../Models/Feed/video.type";

const getVideosService = ({ currentPage, order }: GetVideos) => {
    return server.get(`/videos?page=${currentPage}&order=${order}`, {});
};
const getVideosAction = createAsyncThunk("feed/videos/get", async (params: GetVideos, { rejectWithValue }) => {
    try {
        const res = await getVideosService(params);
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getVideosAction;
