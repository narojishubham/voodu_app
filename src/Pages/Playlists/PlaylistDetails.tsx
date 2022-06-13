import { useEffect, useState } from "react";
import "./Playlists.css";
import {
    Col,
    Row,
    Space,
    Spin,
    Typography,
    PaginationProps,
    Button as AntButton,
    Modal,
    message,
    Empty,
    Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceHolderImage from "../../Assets/partials/placeholderImage.png";
import SearchBox from "../../Components/Partials/SearchBox";
import Button from "../../Components/Partials/Button";
import { RouterPaths } from "../../api/RouterPaths";
import FeedCard from "../../Components/FeedCard/FeedCard";
import EmbedCodeModal from "../../Shared/Models/EmbedCodeModal/EmbedCodeModal";
import deletePlaylistItemAction from "../../Shared/Redux/Actions/playlist/deletePlaylistItem.action";
import { useAppDispatch } from "../../Shared/Redux/store";
import { IsearchVideoFromPlaylist, PlaylistItemType } from "../../Shared/Models/Playlist/plalist.type";
import searchVideosFromPlaylistAction from "../../Shared/Redux/Actions/playlist/searchVideoFormPlaylist.service";
import getPlaylistAction from "../../Shared/Redux/Actions/playlist/getPlaylist.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { searchVideosFromPlaylistService } from "../../Shared/Redux/Actions/playlist/searchVideoFormPlaylist.action";

const PlaylistDetails = () => {
    const navigate = useNavigate();
    let { playlistId } = useParams();

    const [viewEmbedModal, setViewEmbedModal] = useState(false);

    const [playlistData, setPlaylistData] = useState({} as PlaylistItemType);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    /**
     * Fetch playlist data
     * @function handleGetData
     * @param {string} id
     * @param {number} page
     * @throws When there is a error playlist data fetching
     */
    const handleGetData = (id: number) => {
        setLoading(true);
        console.log("idd dd d d d d d ", id);
        dispatch(getPlaylistAction({ playlistId: id }))
            .unwrap()
            .then((res: any) => {
                setPlaylistData(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    /**
     * Handles page changes in pagination
     * @function handlePaginationChange
     * @param {number} page
     * @param {number} size
     */
    const handlePaginationChange: PaginationProps["onChange"] = (page, size) => {
        console.log({ page, size });
        if (playlistId) handleGetData(parseInt(playlistId));
    };

    const [onSearchStringChange, setOnSearchStringChange] = useState<any>("");
    const [searchData, setSearchData] = useState("");

    /**
     * Handles video search in playlist
     * @function handleSearchVideos
     * @param {string} searchString
     * @throws When search request fails
     */
    const handleSearchVideos = (searchQuery: string) => {
        // console.log('playlistId', playlistId);
        setLoading(true);
        searchVideosFromPlaylistService({ playlistId, searchQuery });
        // dispatch(searchVideosFromPlaylistAction({playlistId,searchQuery}))
        // .unwrap()
        //   .then((res) => {
        //     console.log({ searchPlaylist: res });
        //     // setPlaylistData(res.data);
        //     setLoading(false);
        // })
        // .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (!onSearchStringChange) handleGetData(parseInt(playlistId));
        handleSearchVideos(onSearchStringChange);
    }, [onSearchStringChange]);

    /**
     * Deletes an existing playlist
     * @function handleDeletePlaylist
     * @param {number} id - Playlist Id
     * @return {Promise}
     */
    const handleDeletePlaylist = async (_id: number) => {
        return await deletePlaylistItemAction(_id);
    };

    /**
     * Shows confirmation message for playlist to be deleted
     * @function confirmModalDeletePlaylist
     * @param {number} deletePlaylistId - Playlist Id
     * @return {Promise}
     * @throws When there is a error playlist deletion
     */
    function confirmModalDeletePlaylist(deletePlaylistId: number) {
        Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Are you sure you want to delete this playlist?",
            okText: "Confirm",
            cancelText: "Cancel",
            onOk() {
                return handleDeletePlaylist(deletePlaylistId)
                    .then(() => navigate(-1))
                    .catch((e) => message.error("Error while deleting playlist:- ", e));
            },
            onCancel() {},
        });
    }

    useEffect(() => {
        console.log("playlistData.videos", playlistData.videos);
    }, [playlistData]);

    return (
        <Space direction={"vertical"} size={12} style={{ width: "100%" }}>
            <Row justify="end" align="middle" gutter={16}>
                <Col flex="auto">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                        Playlist: {playlistData.title}
                    </Typography.Title>
                    <Row>
                        <Col>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Layout: {playlistData.integrationType}
                            </Typography.Title>
                        </Col>
                        <Col style={{ paddingLeft: "1rem" }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Orientation type : {playlistData.orientation}
                            </Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Space size={10}>
                        <SearchBox
                            iconOnly
                            // onInputChangeCallback={(val) => setOnSearchStringChange(val)}
                            onInputChangeCallback={(val) => console.log(val)}
                            onClickCallback={(val) => {
                                console.log(val);
                                handleSearchVideos(val);
                            }}
                        />
                        <Tooltip title="Copy embed code" color={"#fff"} overlayInnerStyle={{ color: "#000" }}>
                            <Button
                                // icon={ <FontAwesomeIcon icon={faFileCode} color={"#FFF"} size={"sm"} />}
                                onClick={() => setViewEmbedModal(!viewEmbedModal)}
                            >
                                Embed Code
                            </Button>
                        </Tooltip>
                        <Link to={RouterPaths.editPage}>
                            <Button>Edit</Button>
                        </Link>
                        <Tooltip title="Remove playlist" color={"#fff"} overlayInnerStyle={{ color: "#000" }}>
                            <Button onClick={() => confirmModalDeletePlaylist(playlistData.id)}>
                                <FontAwesomeIcon icon={faTrashCan} color={"#FFF"} size={"sm"} />
                            </Button>
                        </Tooltip>
                    </Space>
                </Col>
            </Row>
            <Row
                justify={loading || playlistData?.videos?.length === 0 ? "center" : "start"}
                align={loading || playlistData?.videos?.length === 0 ? "middle" : "top"}
                gutter={[16, 16]}
                style={{
                    overflow: "hidden scroll",
                    // height: "calc(100vh - 15.5rem)",
                    padding: "0 0 1rem",
                }}
                className={`${playlistData.orientation === "landscape" ? "" : "potraitCardHeight"}`}
            >
                {loading ? (
                    <Spin />
                ) : // : Array.from(Array(12).keys()).map((el,i)=>{
                playlistData && playlistData.videos?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    playlistData &&
                    playlistData?.videos?.map((el, i) => {
                        console.log(el);
                        return (
                            <Col
                                className={`${playlistData.orientation === "landscape" ? "playlistFeedCard" : ""}`}
                                key={i}
                                {...(playlistData.orientation === "landscape"
                                    ? {
                                          md: 12,
                                          lg: 8,
                                          xl: 6,
                                          xxl: 4,
                                      }
                                    : {
                                          xs: 22,
                                          md: 8,
                                          lg: 8,
                                          xl: 8,
                                          xxl: 4,
                                      })}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "fit-content",
                                }}
                            >
                                <FeedCard
                                    key={i}
                                    data={{
                                        coverImage: el.poster != null ? el.poster.urls.original : PlaceHolderImage,
                                        title: el.caption,
                                        noOfVideos: playlistData.videos?.length,
                                        videoURL: el.resource != null ? el.resource.urls.original : "",
                                        ctaBtnTitle: el.ctaBtnTitle,
                                        ctaBtnUrl: el.ctaBtnUrl,
                                        id: el.id,
                                        shareEnabled: true,
                                        mode: 3,
                                    }}
                                    actionButtonsLeft={[
                                        <div>
                                            <Tooltip
                                                title="View video"
                                                color={"#fff"}
                                                overlayInnerStyle={{ color: "#000" }}
                                            >
                                                <AntButton
                                                    icon={
                                                        <FontAwesomeIcon icon={faEye} color={"#00000095"} size={"sm"} />
                                                    }
                                                    style={{
                                                        borderRadius: "0.5rem 0 0 0",
                                                        float: "left",
                                                    }}
                                                    // onClick={()=> navigate(`${el.id}/${RoutePaths.viewPage}`)}
                                                />
                                            </Tooltip>
                                        </div>,
                                    ]}
                                    actionButtonsRight={[
                                        <div>
                                            <Tooltip
                                                title="Edit video"
                                                color={"#fff"}
                                                overlayInnerStyle={{ color: "#000" }}
                                            >
                                                <AntButton
                                                    icon={
                                                        <FontAwesomeIcon
                                                            icon={faEdit}
                                                            color={"#00000095"}
                                                            size={"sm"}
                                                        />
                                                    }
                                                    style={{
                                                        borderRadius: "0 0 0 0.5rem",
                                                    }}
                                                    // onClick={()=> navigate(`${el.id}/${RoutePaths.editPage}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title="Remove video"
                                                color={"#fff"}
                                                overlayInnerStyle={{ color: "#000" }}
                                            >
                                                <AntButton
                                                    icon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            color={"#00000095"}
                                                            size={"sm"}
                                                        />
                                                    }
                                                    style={{
                                                        borderRadius: "0 0.5rem 0 0",
                                                    }}
                                                    // onClick={()=> confirmModalDeletePlaylist(el.id)}
                                                />
                                            </Tooltip>
                                        </div>,
                                    ]}
                                />
                            </Col>
                        );
                    })
                )}
            </Row>
            <EmbedCodeModal
                modalOpenState={viewEmbedModal}
                closeModalFn={() => setViewEmbedModal(!viewEmbedModal)}
                playlistData={playlistData}
            />
        </Space>
    );
};

export default PlaylistDetails;
