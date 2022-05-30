import axiosRequest from "../../../axios/axiosRequest";

const getVideos = (currentPage?: number, order?: string): any => {
    return axiosRequest
      .get(`/videos?page=${currentPage}&order=${order}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      });
  };
  const searchVideos = (
    query: string,
    currentPage: number,
    order: string
  ): any => {
    return axiosRequest
      .get(`/videos?q=${query}&page=${currentPage}&order=${order}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      });
  };
  const deleteVideo = (id?: number): any => {
    return axiosRequest
      .delete(`/videos/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      });
  };
  const updateVideoService ={
    deleteVideo,searchVideos,getVideos
  }
  export default updateVideoService