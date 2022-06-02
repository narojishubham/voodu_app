import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const searchVideosService = async (query: string, currentPage: number, order: string) => {
    try {
        const response = await server.get(`/videos?q=${query}&page=${currentPage}&order=${order}`, {});
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
