import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { GetVideosResponse } from "../../../Models/Feed/video.type";

interface searchVideosFromVideoLibrary {
    q?: string, currentPage?: number, order?: string
}

export const searchVideosService = async ({q, currentPage = 1, order}:searchVideosFromVideoLibrary) => {
    // try {
        // const response = await server.get(`/videos?q=${query}&page=${currentPage}&order=${order}`, {});
        const response = await server.get<GetVideosResponse>("/videos", {
            params:{q,currentPage,order}
        });
        return axiosResHandle(response);
    // } catch (err) {
        // return axiosErrHandle(err);
    // }
};
