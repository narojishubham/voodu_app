import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

export const getNotificationService = async () => {
    try {
        const response = await server.get("/account/notifications");
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
