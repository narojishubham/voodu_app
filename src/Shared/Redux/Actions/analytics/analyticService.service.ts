import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

const GetBrandData = async (id: number = -1) => {
    try {
        const response = await server.get(`analytics/brand/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};


const GetVidedoData = async (id: number = -1) => {
    try {
        const response = await server.get(`analytics/top-videos/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};

const GetTopHashtags = async (id: number = -1) => {
    try {
        const response = await server.get(`analytics/top-hashtags/${id}`);
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};

const GetGraphData = async(id:number = -1, ) =>{
    try{
        const response =await server.get(`analytics/graph?brand_id=${id}&days=${7}`);
        return axiosResHandle(response)
    }catch (err){
        return axiosErrHandle(err)
    }
}

const analyticService = {
    GetBrandData,
    GetVidedoData,
    GetTopHashtags,
    GetGraphData
};
export default analyticService;
