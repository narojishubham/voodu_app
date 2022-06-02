import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const GetBrandDataService = async (id: any) => {
    try {
        const response = await server.get(`analytics/brand/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
