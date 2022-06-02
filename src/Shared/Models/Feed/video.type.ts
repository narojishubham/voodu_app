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
    id: number;
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
