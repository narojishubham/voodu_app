import axiosRequest from "../../../axios/axiosRequest";

const GetBrandData = (id: any): any => {
    return axiosRequest.get(`/analytics/brand/${id}`).then((response) => {
      // console.log("GetBrandData --- - - - - -", { response });
      return response;
    });
  };
  
  const GetVidedoData = (id?: number): any => {
    return axiosRequest.get(`analytics/top-videos/${id}`).then((response) => {
      // console.log("11 1 1 1 1 1 GetVidedoData", { response });
      return response.data;
    });
  };
  
  const GetTopHashtags = (id?: number): any => {
    return axiosRequest.get(`analytics/top-hashtags/${id}`).then((response) => {
      // console.log("11 1 1 1 1 1 GetTopHashtags 2 2 2 2 2", { response });
      return response.data;
    });
  };
  
  const analyticService = {
    GetBrandData,
    GetVidedoData,
    GetTopHashtags,
  };
  export default analyticService;
  