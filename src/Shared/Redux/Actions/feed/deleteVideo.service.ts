import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const deleteVideoService = async (id: number) => {
    try {
        const response = await server.delete(`/videos/${id}`, {});
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
