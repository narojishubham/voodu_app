import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const GetTopVideoDataService = async (id: number) => {
    try {
        const response = await server.get(`analytics/top-videos/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
