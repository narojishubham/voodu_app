import { PlaylistLayoutType, PlaylistOrientation } from "../enums/playlist";

export type getPlaylistItemTypes = {
    id: string;
    page: number;
};
export type getPlaylist = {
    playlistId: number;
};
export interface PlaylistListEachType {
    id: number;
    accountId: number;
    state: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    integrationId: string;
    integrationType?: null;
    embedCode?: null;
    videoCount: number;
}
export type PlaylistListResType = {
    data: PlaylistListEachType[];
    total: number;
    page: number;
    perPageLimit: number;
    totalFeedVideos: number;
};
export type CreatePlaylistPropsType = {
    title?: string;
    videos?: { id: string }[] | { id: number }[];
    state?: string;
    integrationType?: PlaylistLayoutType;
    orientation: PlaylistOrientation;
};
export type CreatePlaylistResponse = {
data:{
    title: string;
    integrationType: string;
    accountId: number;
    state: string;
    orientation: string;
    videos: {
        id: number;
        position: number;
    }[];
    id: number;
    createdAt: string;
    updatedAt: string;
    integrationId: string;
    embedCode: any;
}
};
export type deletePlaylistItemTypes = {
    _id: number;
};
export type getVideoById = {
    id: number;
};
export type searchParams = {
    searchQuery: string;
    page: number;
};
export type IsearchVideoFromPlaylist = {
    playlistID: any;
    searchQuery: string;
};
export type UpdatePlaylistProps = {
    id: number;
    accountId: number;
    state: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    newVideoArray: string[];
};
export type PlaylistItemType = {
    id: number;
    accountId: number;
    state: string;
    title?: string;
    createdAt: string;
    updatedAt: string;
    integrationId: string;
    integrationType: null;
    embedCode?: null;
    orientation?: string;
    videos: VideoEntityType[];
};
export interface VideoEntityType {
    id: number;
    accountId: number;
    userId: number;
    caption: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    ctaBtnTitle: string;
    ctaBtnUrl: string;
    resourceId: number;
    posterId?: null;
    position: number;
    poster?: {
        id: number;
        accountId: number;
        userId: number;
        width: number;
        height: number;
        size: number;
        duration?: null;
        filename: string;
        key: string;
        processed?: null;
        valid: boolean;
        verificationError?: null;
        variations?: null;
        createdAt: string;
        updatedAt: string;
        urls: {
            original: string;
        };
    };
    resource: {
        id: number;
        accountId: number;
        userId: number;
        width?: null;
        height?: null;
        size?: null;
        duration: number;
        filename: string;
        key: string;
        processed?: null;
        valid: boolean;
        verificationError?: null;
        variations?: null;
        createdAt: string;
        updatedAt: string;
        urls: {
            original: string;
        };
    };
    tags?:{ id: number
  accountId: number
  value: string} [];
}
export interface PlaylistItemResType {
    data: PlaylistItemType;
}
export interface PlaylistItemDeleteResType {
    data: {
        id: number;
        accountId: number;
        state: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        integrationId: string;
        integrationType?: null;
        embedCode?: null;
    };
}
export type PlaylistListEachResType = {
    data: PlaylistListEachType;
};
