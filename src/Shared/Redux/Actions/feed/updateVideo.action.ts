import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { UpdateVideoService } from "../../../Models/Feed/video.type";

const updateVideoService = (data: UpdateVideoService) => {
    return server.patch(`/videos/${data.id}`, data);
};
const updateVideoAction = createAsyncThunk("add/video", async (params: UpdateVideoService, { rejectWithValue }) => {
    try {
        const res = await updateVideoService(params);
        return axiosResHandle(res);
    } catch (err) {
        return axiosErrHandle(err);
    }
});
export default updateVideoAction;
