export type CreateVideoProps = {
    resourceId: number;
    youtubeUrl: string;
    caption: string;
    description: string;
    ctaBtnUrl: string;
    ctaBtnTitle: string;
    posterId: number | null;
    tags: string[];
    playlistIds: string[];
    orientation: string;
};
export type UpdateVideoService = {
    videoId: number;
    caption: string;
    description: string;
    ctaBtnUrl: string;
    ctaBtnTitle: string;
    posterId: number;
    tags: string[];
    playlistIds: string[];
};
export type GetVideos = {
    currentPage: number;
    order: string;
};
export type GetVideosResponse ={
  data: {
    id: number;
    accountId?: number;
    userId?: number;
    caption?: string;
    description?: string;
    state?: string;
    createdAt?: string;
    updatedAt?: string;
    ctaBtnTitle?: string;
    ctaBtnUrl?: string;
    resourceId?: number;
    posterId?: number;
    resource?: {
      id?: number;
      accountId?: number;
      userId?: number;
      width?: number;
      height?: number;
      size?: number;
      duration?: number;
      filename?: string;
      key?: string;
      processed?: string;
      valid?: boolean;
      verificationError?: string;
      variations?: string;
      createdAt?: string;
      updatedAt?: string;
      urls?: {
        original?: string;
      };
    };
    poster?: {
      id?: number;
      accountId?: number;
      userId?: number;
      width?: number;
      height?: number;
      size?: number;
      duration?: number;
      filename?: string;
      key?: string;
      processed?: string;
      valid?: boolean;
      verificationError?: string;
      variations?: string;
      createdAt?: string;
      updatedAt?: string;
      urls?: {
        original?: string;
      };
    };
  }[];
  total?: number;
  page?: number;
}
