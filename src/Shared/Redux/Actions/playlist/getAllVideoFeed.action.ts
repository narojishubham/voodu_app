import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { GetVideosResponse,  } from "../../../Models/Feed/video.type";

type GetAllVideosFeed = {
    page?: number,
    q?: string,
    itemsPerPage?: number;
    orientation?: string;
}

const getAllVideosFeedService = ({
    page,
    q,
    itemsPerPage,
    orientation,
}: GetAllVideosFeed) => {
    // return (server.get<GetVideosResponse1>("/videos", { params: { page, itemsPerPage, q, orientation }, }))
    return (server.get("/videos", { params: { page, itemsPerPage, q, orientation }, }))

};
const getAllVideosFeedAction = createAsyncThunk("createplaylist/getvideo", async (params: GetAllVideosFeed, { rejectWithValue }) => {
    try {
        const res = await getAllVideosFeedService(params);
        return axiosResHandle(res);
    } catch (err) {
        return rejectWithValue(axiosErrHandle(err));
    }
});
export default getAllVideosFeedAction;


