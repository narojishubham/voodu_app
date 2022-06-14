import server from "../../../../../api";
import { axiosResHandle } from "../../../../../api/axiosHandle";

type createVideoFeed =  {
  resourceId?: number;
  youtubeUrl?: string;
  caption?: string;
  description?: string;
  ctaBtnUrl?: string;
  ctaBtnTitle?: string;
  posterId?: number | null;
  tags?: string[];
  playlistIds?: string[];
  orientation?: string;
}

export const createVideoFeedService = ({
  resourceId,
  youtubeUrl,
  caption,
  description,
  ctaBtnUrl,
  ctaBtnTitle,
  posterId,
  tags,
  playlistIds,
   orientation,
}:
createVideoFeed) => {
  return server
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
        orientation,
      }
    )
    .then((response) => {
      return axiosResHandle(response);
    });
};