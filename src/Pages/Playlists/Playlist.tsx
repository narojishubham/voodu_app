import { useCallback, useEffect, useState } from "react";
import "./Playlists.css";
import {
    Col,
    Row,
    Space,
    Pagination,
    Spin,
    Typography,
    PaginationProps,
    Button as AntButton,
    Modal,
    Empty,
    Tooltip,
    message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faFileCode, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import PlaceHolderImage from "../../Assets/partials/placeholderImage.png";
import _ from "lodash";
import { RouterPaths } from "../../api/RouterPaths";
import FeedCard from "../../Components/FeedCard/FeedCard";
import SearchBox from "../../Components/Partials/SearchBox";
import { deletePlaylistItemTypes, PlaylistListResType } from "../../Shared/Models/Playlist/playlist.type";
import { playlistLayoutsEmbedCode } from "../../Shared/Models/enums/helpers/PlaylistLayoutsEmbedCode";
import { PlaylistLayoutType } from "../../Shared/Models/enums/playlist";
import { useAppDispatch } from "../../Shared/Redux/store";
import getPlaylistListAction from "../../Shared/Redux/Actions/playlist/getPlaylistList.action";
import deletePlaylistItemAction from "../../Shared/Redux/Actions/playlist/deletePlaylistItem.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { searchPlaylistListService } from "../../Shared/Redux/Actions/playlist/searchPlaylistList.action";
import Button from "../../Components/Partials/Button";

const Playlist = () => {
    const navigate = useNavigate();
    const [list, setList] = useState<PlaylistListResType>({
        data: [],
        page: 1,
        total: 0,
        perPageLimit: 12,
        totalFeedVideos: 0,
    });
    const [loading, setLoading] = useState(true);

    /**
     * Fetches playlists
     * @function handleGetList
     * @param {number} page
     * @throws Will throw an error when fetching playlist fails
     */
    const dispatch = useAppDispatch();
    const handleGetList = (page: number = 1) => {
        setLoading(true);
        dispatch(getPlaylistListAction(page))
            .unwrap()
            .then((res: any) => {
                // console.log({ getPlaylistList: res });
                setList(res);
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
        // console.log(page, size);
        handleGetList(page);
    };

    const [onSearchStringChange, setOnSearchStringChange] = useState("");

    /**
     * Handles playlist search
     * @function handleSearchPlaylist
     * @param {string} searchString
     * @throws Will throw an error when search for playlist fails
     */
    const handleSearchPlaylist = (q: any) => {
        // console.log({ q });
        setLoading(true);
        searchPlaylistListService({ q })
            .then((res: any) => {
                // console.log(res);
                setList(res);
                setLoading(false);
            })
            .catch(() => {});

        // dispatch(searchPlaylistListAction(searchString))
        //   .then(unwrapResult)
        //   .then((res) => {
        //     console.log({ searchPlaylist: res });
        //     // setList(res);
        //     // setLoading(false);
        //   })
        //   .catch(() => setLoading(false));
    };

    /**
     * This callback to handle playlist searching
     * @callback debounce
     * @param {Object} e - Search Query
     */
    const searchFn = useCallback(
        _.debounce((e: any) => {
            handleSearchPlaylist(e);
        }, 500),
        []
    );

    useEffect(() => {
        if (!onSearchStringChange) handleGetList();
    }, [onSearchStringChange]);

    /**
     * Deletes an existing playlist
     * @function handleDeletePlaylist
     * @param {number} id - Playlist Id
     * @return {Promise}
     */
    // const handleDeletePlaylist = (deletePlaylistId: deletePlaylistItemTypes) => {
    //     return dispatch(deletePlaylistItemAction(id:deletePlaylistId)).unwrap();
    // };

    /**
     * Shows confirmation message for playlist to be deleted
     * @function confirmModalDeletePlaylist
     * @param {number} deletePlaylistId - Playlist Id
     * @return {Promise}
     * @throws When there is a error playlist deletion
     */

    function confirmModalDeletePlaylist(deletePlaylistId: number) {
        // console.log("deletePlaylistId", deletePlaylistId);
        Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Are you sure you want to delete this playlist?",
            okText: "Confirm",
            cancelText: "Cancel",
            onOk() {
                dispatch(deletePlaylistItemAction({ _id: deletePlaylistId }))
                    .unwrap()
                    .then(() => handleGetList())
                    .catch((e: any) => message.error("Error while deleting playlist:- ", e));
            },
            onCancel() {},
        });
    }

    return (
        <Space direction={"vertical"} size={12} style={{ width: "100%" }}>
            <Row justify="end" align="middle" gutter={16}>
                <Col flex="auto">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        All Playlists
                    </Typography.Title>
                </Col>
                <Col>
                    <Space size={10}>
                        <SearchBox
                            iconOnly
                            onInputChangeCallback={searchFn}
                            onClickCallback={(val) => handleSearchPlaylist(val)}
                        />
                        <Link to={RouterPaths.addPage}>
                            <Button disabled={list.totalFeedVideos === 0}>Create Playlist</Button>
                        </Link>
                    </Space>
                </Col>
            </Row>
            <Row
                justify={loading || list.data.length === 0 ? "center" : "start"}
                align={loading || list.data.length === 0 ? "middle" : "top"}
                gutter={[16, 16]}
                style={{
                    overflow: "hidden scroll",
                    height: "calc(100vh - 15.5rem)",
                    padding: "0 0 1rem",
                }}
            >
                {loading ? (
                    <Spin />
                ) : // : Array.from(Array(12).keys()).map((el,i)=>{
                list && list.data.length === 0 ? (
                    <Space direction={"vertical"}>
                        <Typography.Paragraph>
                            {list.totalFeedVideos === 0
                                ? "Add a video to video libraries before creating a playlist"
                                : "Create a playlist"}
                        </Typography.Paragraph>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Space>
                ) : (
                    list.data.map((el, i) => {
                        // console.log({ el });
                        return (
                            <Col
                                key={i}
                                md={12}
                                lg={8}
                                xl={6}
                                xxl={4}
                                onClick={(e) => {
                                    if (e.detail > 1) navigate(`${el.id}`);
                                }}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "fit-content",
                                    paddingTop: "1.6vw",
                                }}
                                className="FeedCardWraper"
                            >
                                <FeedCard
                                    data={{
                                        coverImage:
                                            // @ts-ignore
                                            el?.videos[0]?.poster?.urls?.original || PlaceHolderImage,
                                        title: el.title,
                                        noOfVideos: el.videoCount,
                                        mode: 2,
                                    }}
                                    showDescription
                                    actionButtonsLeft={[
                                        <div>
                                            <Tooltip
                                                title="View playlist"
                                                color={"#fff"}
                                                overlayInnerStyle={{
                                                    color: "#000",
                                                }}
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
                                                    onClick={() => navigate(`${el.id}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title="Copy embed code"
                                                color={"#fff"}
                                                overlayInnerStyle={{
                                                    color: "#000",
                                                }}
                                            >
                                                <Typography.Paragraph
                                                    copyable={{
                                                        text: playlistLayoutsEmbedCode(
                                                            el.integrationId,
                                                            PlaylistLayoutType.carousel
                                                        ),
                                                        icon: (
                                                            <AntButton
                                                                icon={
                                                                    <FontAwesomeIcon
                                                                        icon={faFileCode}
                                                                        color={"#00000095"}
                                                                        size={"sm"}
                                                                    />
                                                                }
                                                                style={{
                                                                    borderRadius: "0 0 0.5rem 0",
                                                                }}
                                                            />
                                                        ),
                                                        tooltips: false,
                                                    }}
                                                    style={{
                                                        float: "left",
                                                        display: "inline-flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        background: "#fff",
                                                        width: 32,
                                                        aspectRatio: "1",
                                                        margin: "0 0 0 -2px",
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>,
                                    ]}
                                    actionButtonsRight={[
                                        <div>
                                            <Tooltip
                                                title="Edit playlist"
                                                color={"#fff"}
                                                overlayInnerStyle={{
                                                    color: "#000",
                                                }}
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
                                                    onClick={() => navigate(`${el.id}/${RouterPaths.editPage}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title="Delete playlist"
                                                color={"#fff"}
                                                overlayInnerStyle={{
                                                    color: "#000",
                                                }}
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
                                                    onClick={() => confirmModalDeletePlaylist(el.id)}
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
            <Row justify="center" align="middle" style={{ padding: "1rem 0 0" }}>
                <Pagination
                    pageSize={list?.data.length}
                    current={list?.page}
                    size="small"
                    total={list?.total}
                    onChange={handlePaginationChange}
                    disabled={list && list?.total / 12 <= 1}
                />
            </Row>
        </Space>
    );
};

export default Playlist;
