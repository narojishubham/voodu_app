import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import AppPagesRoutes from "./AppPagesRoutes";
import AuthPagesRoutes from "./AuthPagesRoutes";
import LoginPage from "../../Pages/Login";
import SignUpPage from "../../Pages/Signup";
import OverviewPage from "../../Pages/Overview";
import ForgotPasswordPage from "../../Pages/ForgotPassword";
import NewPasswordPage from "../../Pages/NewPassword";
import ProfilePage from "../../Pages/ProfilePage";
import Playlist from "../../Pages/Playlists/Playlist";
import PlaylistDetails from "../../Pages/Playlists/PlaylistDetails";
import CreatePlaylistPage from "../../Pages/Playlists/CreatePlaylist/CreatePlaylistPage";
import VideoLibrary from "../../Pages/VideoLibraryPage/VideoLibrary";
import UploadVideo from "../../Pages/VideoLibraryPage/UploadVideo/UploadVideo";
import VideoDetailsViewEdit from "../../Pages/VideoLibraryPage/VideoDetailsViewEdit/VideoDetailsViewEdit";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RouterPaths.root}>
                    <Route element={<AppPagesRoutes />}>
                        <Route index element={<Navigate to={RouterPaths.videoLibrary} replace />} />
                        <Route path={RouterPaths.profile} element={<ProfilePage />} />
                        <Route path={RouterPaths.overview} element={<OverviewPage />} />
                        <Route path={RouterPaths.videoLibrary}>
                            <Route index element={<VideoLibrary />} />
                            <Route path={RouterPaths.addPage} element={<UploadVideo />} />
                            <Route path={RouterPaths.p_videoId}>
                                <Route index element={<VideoDetailsViewEdit />} />
                                <Route path={RouterPaths.editDetails} element={<VideoDetailsViewEdit />} />
                            </Route>
                        </Route>
                        <Route path={RouterPaths.uploadVideo} element={<UploadVideo />} />

                        <Route path={RouterPaths.playlists}>
                            <Route index element={<Playlist />} />
                            <Route path={RouterPaths.addPage} element={<CreatePlaylistPage />} />
                            <Route path={RouterPaths.playlists__Id}>
                                <Route index element={<PlaylistDetails />} />
                                <Route path={RouterPaths.editPage} element={<CreatePlaylistPage />} />
                            </Route>
                        </Route>
                        <Route path={RouterPaths.settings} element={<div>settings</div>} />
                    </Route>

                    <Route element={<AuthPagesRoutes />}>
                        <Route path={RouterPaths.login} element={<LoginPage />} />
                        <Route path={RouterPaths.signup} element={<SignUpPage />} />
                        <Route path={RouterPaths.forgotPassword} element={<ForgotPasswordPage />} />
                        <Route path={RouterPaths.newPassword} element={<NewPasswordPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
