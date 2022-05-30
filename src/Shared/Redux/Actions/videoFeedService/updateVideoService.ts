import axiosRequest from "../../../axios/axiosRequest";
import { IUpdateVideoService } from "../../../interface/videoFeedInterface";

const updateVideo = ({
    id,
    caption,
    description,
    ctaBtnUrl,
    ctaBtnTitle,
    posterId,
    tags,
    playlistIds,}
  : IUpdateVideoService)=> {
    return axiosRequest
      .patch(
        `/videos/${id}`,
        {
          caption,
          description,
          ctaBtnUrl,
          ctaBtnTitle,
          posterId,
          tags,
          playlistIds,
        },
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then((response) => {
        return response.data;
      });
  };
  const updateVideoService ={
    updateVideo
  }
  export default updateVideoService