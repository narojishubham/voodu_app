import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import PlaceHolderImage from "../../Assets/partials/placeholderImage.png";
import { SmileOutlined, EditOutlined } from "@ant-design/icons";
import {
    message as msg,
    Select,
    Col,
    Row,
    Space,
    Pagination,
    Spin,
    Typography,
    Button as AntButton,
    Modal,
    Empty,
    Tooltip,
    notification,
} from "antd";
import _ from "lodash";
import "./VideoLibrary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Shared/Redux/store";
import { PlaylistListResType } from "../../Shared/Models/Playlist/playlist.type";
import SearchBox from "../../Components/Partials/SearchBox";
import { RouterPaths } from "../../api/RouterPaths";
import FeedCard from "../../Components/FeedCard/FeedCard";
import { searchVideosService } from "../../Shared/Redux/Actions/feed/searchVideos.service";
import getPlaylistListAction from "../../Shared/Redux/Actions/playlist/getPlaylistList.action";
import getVideoByIdAction from "../../Shared/Redux/Actions/playlist/getVideoById.action";
import getVideosAction from "../../Shared/Redux/Actions/feed/getVideo.action";
import deleteVideoAction from "../../Shared/Redux/Actions/feed/deleteVideo.action";
import Button from "../../Components/Partials/Button";

export interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
}

export default function VideoLibrary() {
    const [loading, setLoading] = useState(/** @type {boolean} */ false);
    const [trialNotification, setTrialNotification] = useState([]);
    const [isEditVideoDetailsVisible, setIsEditVideoDetailsVisible] = useState(false);
    const [uploadVideos, setUploadVideos] = useState<any | []>([]);
    const [sortBy, setSortBy] = useState(/** @type {string} */ "desc");
    const [perPage, setPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [getVideosLength, setGetVideosLength] = useState(0);
    const [onSearchStringChange, setOnSearchStringChange] = useState("");
    const { Option } = Select;
    const dispatch = useAppDispatch();
    const [reload, setReload] = useState({});
    const [list, setList] = useState<PlaylistListResType>({} as PlaylistListResType);
    const navigate: NavigateFunction = useNavigate();
    /**
     * Show's plan's validity ending notification in day's
     * @async
     * @function loadNotification
     * @throws When there is a error in response.
     */
    // const loadNotification = async () => {
    //     NotificationService.getNotification()
    //         .then((data: any) => {
    //             setTrialNotification(data);

    //             if (data.data.type === "notificationOne") {
    //                 notification.open({
    //                     message: "Plan About to end",
    //                     description: "Hello your free version will get over in next 21 days.",
    //                     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    //                 });
    //             } else if (data.data.type === "notificationTwo") {
    //                 notification.open({
    //                     message: "Plan about to end",
    //                     description: "Hello your free version will get over in next 14 days.",
    //                     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    //                 });
    //             } else if (data.data.type === "notificationThree") {
    //                 notification.open({
    //                     message: "Plan About to end",
    //                     description: "Hello your free version will get over in next 7 days.",
    //                     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    //                 });
    //             }
    //         })
    //         .catch((error: any) => {
    //             console.log("notification error");
    //         });
    // };

    useEffect(() => {
        // loadNotification();
    }, []);

    const accountId: number = 1;
    useEffect(() => {
        if (onSearchStringChange === "") {
            if (isEditVideoDetailsVisible === false) {
                dispatch(getVideosAction({ currentPage, order: sortBy }))
                    .unwrap()
                    .then((response) => {
                        setUploadVideos(response?.data);
                        if (response?.page) setCurrentPage(response?.page);
                        if (response?.total) setGetVideosLength(response?.total);
                    });
            }
        } else {
            // dispatch(
            searchVideosService({
                q: onSearchStringChange,
                currentPage: currentSearchPage,
                order: sortBy,
            }).then((response) => {
                setUploadVideos(response?.data);
                if (response?.page) setCurrentPage(response.page);
                if (response?.total) setGetVideosLength(response.total);
            });
        }
    }, [currentPage, currentSearchPage, isEditVideoDetailsVisible, onSearchStringChange, reload, sortBy]);

    /**
     * Searching video's by search string
     * @function querySearchVideos
     * @param {string} query
     */
    const querySearchVideos = (q: string) => {
        searchVideosService({ q, currentPage: currentSearchPage, order: sortBy }).then((response: any) => {
            setUploadVideos(response.data);
            setCurrentPage(response.page);
            setGetVideosLength(response.total);
        });
    };

    /**
     * Page changes when a number is selected under pagination
     * @function onPageChange
     * @param {number} pageNumber - Passing the page number
     */
    const onPageChange = (pageNumber: number) => {
        if (onSearchStringChange !== "") {
            setCurrentSearchPage(pageNumber);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    /**
     * Shows total number of videos fetched
     * @function showTotal
     * @param {number} total
     * @returns {string} Total number of videos fetched
     */
    function showTotal(total: number): string {
        return `Total ${total} videos`;
    }

    /**
     * Show fetched videos in Ascending order or Descending  order of video library is selected
     * @function handleOrderChange
     * @param {any} value
     */
    function handleOrderChange(value: any) {
        //console.log(`Selected: ${value.value}`);
        setCurrentPage(1);
        setCurrentSearchPage(1);
        setSortBy(value.value);
    }

    /**
     * Fetches playlists
     * @function handleGetList
     * @param {number} page
     */
    const handleGetList = (page: number = 1) => {
        setLoading(true);

        dispatch(getPlaylistListAction({ page }))
            .unwrap()
            .then((res) => {
                if (res) setList(res);
                // console.log("resp getPlaylistListAction", res);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (!onSearchStringChange) handleGetList();
    }, [onSearchStringChange]);

    /**
 * Deletes a video from Video Library section
  /**
 * @function handleVideoDelete
 * @param {number} id - Passes video id to be deleted 
 * @throws Will throw an error if the deletion is not successfully.
 */
    const handleVideoDelete = (id: number) => {
        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to delete this video?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                dispatch(deleteVideoAction({ id }))
                    .unwrap()
                    .then((response: any) => {
                        //console.log({ response });
                        msg.success("Video deleted successfully", 2);
                        setReload({});
                    })
                    .catch((error: any) => {
                        msg.error(error.message, 2);
                        //console.log({ error });
                    });
            },
        });
    };

    return (
        <Space direction={"vertical"} size={12} style={{ width: "100%" }}>
            <>
                <Row justify="end" align="middle" gutter={16}>
                    <Col flex="auto">
                        <Typography.Title level={5} style={{ margin: 0 }}>
                            All Videos
                        </Typography.Title>
                    </Col>
                    <Col>
                        <Space size={10}>
                            <SearchBox
                                iconOnly
                                onInputChangeCallback={(val) => setOnSearchStringChange(val)}
                                onClickCallback={(val) => querySearchVideos(val)}
                            />
                            <Button
                                onClick={() => {
                                    navigate(RouterPaths.root + RouterPaths.videoLibrary + RouterPaths.addPage);
                                }}
                            >
                                Upload Video
                            </Button>

                            <Select
                                labelInValue
                                placeholder={"Sort"}
                                style={{ width: 120 }}
                                onChange={handleOrderChange}
                                disabled={uploadVideos.length > 0 ? false : true}
                            >
                                <Option value="asc">Title A-Z</Option>
                                <Option value="desc">Title Z-A</Option>
                            </Select>
                        </Space>
                    </Col>
                </Row>

                <Row
                    justify={loading || uploadVideos.length === 0 ? "center" : "start"}
                    align={loading || uploadVideos.length === 0 ? "middle" : "top"}
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
                    uploadVideos.length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    ) : (
                        uploadVideos.map((el: any, i: any) => {
                            // console.log("el el el el el ", el);
                            return (
                                <Col
                                    key={i}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    xxl={4}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "fit-content",
                                    }}
                                >
                                    <FeedCard
                                        data={{
                                            coverImage: el.poster ? el.poster.urls.original : PlaceHolderImage,
                                            title: el.caption,
                                            noOfVideos: uploadVideos?.length,
                                            videoURL: el.resource != null ? el.resource.urls.original : el.youtubeUrl,
                                            ctaBtnTitle: el.ctaBtnTitle,
                                            ctaBtnUrl: el.ctaBtnUrl,
                                            id: el.id,
                                            shareEnabled: true,
                                            mode: 3,
                                        }}
                                        actionButtonsLeft={[
                                            <div>
                                                <Tooltip
                                                    title="View video details"
                                                    color={"#fff"}
                                                    overlayInnerStyle={{ color: "#000" }}
                                                >
                                                    <AntButton
                                                        icon={
                                                            <FontAwesomeIcon
                                                                icon={faEye}
                                                                color={"#00000095"}
                                                                size={"sm"}
                                                            />
                                                        }
                                                        style={{
                                                            borderRadius: "0.5rem 0 0 0",
                                                            float: "left",
                                                        }}
                                                        //onClick={() => showVideoDetailsModal(el.id)}
                                                        onClick={() => {
                                                            navigate(`${el.id}`);
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Edit video details"
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
                                                            borderRadius: "0 0 0 0 ",
                                                        }}
                                                        onClick={() => {
                                                            navigate(`${el.id}/${RouterPaths.editDetails}`);
                                                        }}
                                                        /*onClick={() =>
                                navigate(`${el.id}/${RoutePaths.editPage}`)
                              }*/
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Delete video"
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
                                                            borderRadius: "0 0 0.5rem 0 ",
                                                        }}
                                                        onClick={() => handleVideoDelete(el.id)}
                                                    />
                                                </Tooltip>
                                            </div>,
                                        ]}
                                        actionButtonsRight={[]}
                                    />
                                </Col>
                            );
                        })
                    )}
                </Row>
                <Row justify="center" align="middle" style={{ padding: "1rem 0 0" }}>
                    <Pagination
                        pageSize={perPage}
                        current={currentPage}
                        size="small"
                        total={getVideosLength}
                        onChange={onPageChange}
                        disabled={uploadVideos && getVideosLength / 12 <= 1}
                        showTotal={showTotal}
                        showSizeChanger={false}
                        responsive
                    />
                </Row>
            </>
        </Space>
    );
}
