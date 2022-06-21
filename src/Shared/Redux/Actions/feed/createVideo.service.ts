import axios from "axios";
import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";
import { CreateVideoProps } from "../../../Models/Feed/video.type";

const createUploadRequestService = async (filename: string) => {
    try {
        const response = await server.post("/resources/request", {
            filename,
        });
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
const uploadFileUsingUploadReqIdService = async (uploadUrl: string, file: any) => {
    try {
        const response = await axios.put(uploadUrl, file);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};

const verifyUploadReqService = async (id: number) => {
    try {
        const response = await server.post(`/resources/${id}/verify`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
const createVideoV2Service = async (data: CreateVideoProps) => {
    try {
        const response = await server.post("/videos", data);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};

const getVideoThumbnailService = async (file: string) => {
    try {
        const response = await server.post("/resources/snapShot", { file });
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};
const createVideoService = {
    createVideoV2Service,
    uploadFileUsingUploadReqIdService,
    createUploadRequestService,
    verifyUploadReqService,
    getVideoThumbnailService,
};
export default createVideoService;
