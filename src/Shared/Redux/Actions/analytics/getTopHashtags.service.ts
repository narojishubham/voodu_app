import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const GetTopHashtagsService = async (id: number) => {
    try {
        const response = await server.get(`analytics/top-hashtags/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
