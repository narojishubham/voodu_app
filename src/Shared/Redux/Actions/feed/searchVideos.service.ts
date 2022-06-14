import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

interface searchVideosFromVideoLibrary {
    query?: string, currentPage?: number, order?: string
}

export const searchVideosService = async ({query, currentPage =1,order}:searchVideosFromVideoLibrary) => {
    // try {
        // const response = await server.get(`/videos?q=${query}&page=${currentPage}&order=${order}`, {});
        const response = await server.get("/videos", {
            params:{query,currentPage,order}
        });
        return axiosResHandle(response);
    // } catch (err) {
        // return axiosErrHandle(err);
    // }
};
