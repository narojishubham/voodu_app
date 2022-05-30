import axios from "axios";
import axiosRequest from "../../../axios/axiosRequest";
import { ICreateVideoProps } from "../../../interface/videoFeedInterface";


const createUploadRequest = (filename?: string): any => {
    return axiosRequest
      .post(
        '/resources/request',
        {
          filename,
        },
        // { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        //console.log('createUploadRequest res' + JSON.stringify(response.data));
        return response.data;
      });
  };
  const uploadFileUsingUploadReqId = (uploadUrl: string, file: any): any => {
    return axios.put(uploadUrl, file).then((response) => {
      return response.data;
    });
  };

  const verifyUploadReq = (id?: number): any => {
    return axiosRequest
      .post(
        `/resources/${id}/verify`,
        {},
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then((response) => {
        return response.data;
      });
  };
  const createVideoV2 = ({
    resourceId,
    youtubeUrl,
    caption,
    description,
    ctaBtnUrl,
    ctaBtnTitle,
    posterId,
    tags,
    playlistIds,
  }: //orientation,
  ICreateVideoProps) => {
    return axiosRequest
      .post(
        '/videos',
        {
          youtubeUrl,
          resourceId,
          caption,
          description,
          ctaBtnUrl,
          ctaBtnTitle,
          posterId,
          tags,
          playlistIds,
          //orientation,
        },
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then((response) => {
        return response.data;
      });
  };

  const getTags = (): any => {
    return axiosRequest
      .get('/tags', {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      });
  };
  
  const getVideoThumbnail = (file: string): any => {
    console.log({ file });
    return axiosRequest
      .post(
        '/resources/snapShot',
        { file },
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then((response) => {
        return response.data;
      });
  };
  const createVideoService ={
    createVideoV2,
    uploadFileUsingUploadReqId,
    createUploadRequest,
    verifyUploadReq,
    getTags,
    getVideoThumbnail
  }
  export default createVideoService