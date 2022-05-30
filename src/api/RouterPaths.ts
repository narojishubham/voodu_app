/**
 * Enum for Routes
 * @readonly
 * @enum {string}
 */
export enum RoutePaths {
    // Dashboard routes
    root = "/",
    profile = "profile/",
    overview = "overview/",
    videoLibrary = "video-library/",
    settings = "settings/",
    playlists = "playlists/",
    playlists__Id = ":playlistId/",
    addPage = "add/",
    viewPage = "view/",
    editPage = "edit/",
    uploadVideo = "upload-video/",
    editDetails = "edit/",

    //
    // query_params
    p_videoId = ":videoId/",
    // video__Id = ":videoId/",

    // Auth routes
    login = "login/",
    signup = "signup/",
    forgotPassword = "forgot-password/",
    newPassword = "new-password/",
}
