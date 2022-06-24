import React, { useCallback, useEffect, useState } from "react";
import {
    Card,
    Col,
    Divider,
    Form,
    Input,
    message as msg,
    Modal,
    Pagination,
    Row,
    Space,
    Spin,
    Radio,
    Typography,
    Select,
} from "antd";
import "./CreatePlaylistPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { debounce, get } from "lodash";
import { PlaylistLayoutType, PlaylistOrientation } from "../../../Shared/Models/enums/playlist";
import { CreatePlaylistResponse, VideoEntityType } from "../../../Shared/Models/Playlist/playlist.type";
import { RouterPaths } from "../../../api/RouterPaths";
import { useAppDispatch } from "../../../Shared/Redux/store";
import SearchBox from "../../../Components/Partials/SearchBox";
import Button from "../../../Components/Partials/Button";
import SelectVideoCard from "../../../Components/SelectVideoCard/SelectVideoCard";
import getAllVideosFeedAction from "../../../Shared/Redux/Actions/playlist/getAllVideoFeed.action";
import getPlaylistItemAction from "../../../Shared/Redux/Actions/playlist/getPlaylistItem.action";
import updatePlaylistAction from "../../../Shared/Redux/Actions/playlist/updatePlayList.action";
import createPlaylistAction from "../../../Shared/Redux/Actions/playlist/createPlaylist.action";
import Carousel from "../../../Assets/PlaylistLayouts/carousel.png";
import FloatingPlayer from "../../../Assets/PlaylistLayouts/floating_player.png";
import Grid from "../../../Assets/PlaylistLayouts/grid.png";
import StoryBlock from "../../../Assets/PlaylistLayouts/story_block.png";

export default function CreatePlaylistPage() {
    const imagesList = [Carousel, FloatingPlayer, Grid, StoryBlock];
    const [q, setQ] = useState("");

    const { playlistId } = useParams();
    let location = useLocation();
    const [title, setTitle] = useState("");
    const [playlistLayout, setPlaylistLayout] = useState<PlaylistLayoutType>(PlaylistLayoutType.carousel);

    const layoutArray = Object.keys(PlaylistLayoutType).map((e, i) => {
        return { name: e, image: imagesList[i] };
    });

    const [videosSelected, setVideosSelected] = useState<VideoEntityType[]>([]);
    const [videosDefaultList, setVideosDefaultList] = useState<VideoEntityType[]>([]);

    const [perPage, setPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [getVideosLength, setGetVideosLength] = useState(0);
    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [orientation, setOrientation] = useState<PlaylistOrientation | any>();

    /**
 *  Function called to fetch videos based on passed orientation
  /**
 * @function onOrientationChange
 * @param {any} e - Radio button value
*/
    const onOrientationChange = (e: any) => {
        setOrientation(e.target.value);
        getVideos({ orientation: e.target.value });
        setOrientation(e.target.value);
    };

    /**
     *  Function called to fetch videos when page is changed
     * @function onPageChange
     * @param {number} pageNumber - Page number
     */
    const onPageChange = (pageNumber: number) => {
        getVideos();
    };

    /**
     *  Function shows total number of videos fetched
     * @function showTotal
     * @param {number} total - Total number of videos
     * @returns {string} - Total number of videos fetched
     */
    function showTotal(total: number) {
        return `Total ${total} videos`;
    }

    /**
     * This callback to fetch videos matching search query.
     * @callback debounce
     * @param {string} q - Search Query
     */
    const searchFn = useCallback(
        debounce((q: string) => {
            getVideos({ q });
            setCardLoading(false);
        }, 500),
        []
    );

    /**
     * Search for a video.
     * @function onSearch
     * @param {string} query - Search Query
     */
    const onSearch = (query: string) => {
        setQ(query);
        setCardLoading(true);
        searchFn(query);
    };

    /**
 * Dispatcher called when new Video is Uploaded
  /**
 * @async
 * @function getVideos
 * @param {string} q - Search Query
 * @param {number} page - Page number
 * @param {string} orientation - Orientation(landscape/portrait)
 * @throws Will throw an error when getting videos fail
 */
    type GetAllVideosFeedType = {
        page?: number;
        q?: string;
        itemsPerPage?: number;
        orientation?: string;
    };
    const getVideos = async (params: GetAllVideosFeedType = {}) => {
        const { page = 1, q, orientation } = params;
        // console.log("params,", params);
        setCardLoading(true);
        const res = await dispatch(getAllVideosFeedAction({ page, q, orientation })).unwrap();
        try {
            // console.log({ getVideos: res });
            setVideosDefaultList(get(res, "data", []));
            setCurrentPage(get(res, "page", 1));
            setGetVideosLength(get(res, "total", 0));
            setCardLoading(false);
        } catch (error) {
            setCardLoading(false);
            msg.error(`Error - ${error}`, 10);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    const [onSearchStringChange, setOnSearchStringChange] = useState("");
    const [searchVideosLoading, setSearchVideosLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editModeLoading, setEditModeLoading] = useState(false);
    const [integration, setIntegration] = useState(PlaylistLayoutType);

    useEffect(() => {
        console.log({ editMode });
    }, [editMode]);

    useEffect(() => {
        const checkLocation = location.pathname.split("/").reverse()[1];
        const routerLocation = RouterPaths.editPage.split("/")[0];

        if (playlistId && checkLocation === routerLocation) {
            setEditMode(true);
            setEditModeLoading(true);
            let id = parseInt(playlistId);

            dispatch(getPlaylistItemAction({ id }))
                .unwrap()
                .then((res) => {
                    const data = res?.data;
                    if (data && data.integrationType) {
                        // console.log({ playlistService: data.integrationType });
                        setPlaylistLayout(data.integrationType);
                    }

                    setOrientation(data?.orientation);
                    if (data?.title) setTitle(data?.title);
                    if (data)
                        setVideosSelected([
                            ...data.videos.map((e) => {
                                return { ...e, value: e.caption, key: e.id };
                            }),
                        ]);
                    setEditModeLoading(false);
                })
                .catch((error) => {
                    msg.error(`Error - ${error}`, 10);
                    setEditModeLoading(false);
                });
        }
    }, []);

    const dispatch = useAppDispatch();
    const [playlistErr, setPlaylistErr] = useState(true);
    const [form1] = Form.useForm();
    const navigate = useNavigate();

    /**
 * Dispatcher to clear message called when Playlist name is entered
  /**
 * @function createVideoDispatch
 */
    const navigateBack = () => navigate(-1);
    const [cardLoading, setCardLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    /**
 * Playlist will be created or updated based on editMode value
  /**
 * @function handleCreate
 * @throws Will throw an error when playlist creation or updating fails
 */
    //  if (playlistId) parseInt(playlistId)

    const handleCreate = () => {
        setLoading(true);
        if (editMode) {
            let id = -1;
            if (playlistId) id = parseInt(playlistId);
            const data = {
                title,
                videos: videosSelected,
                integrationType: playlistLayout,
                orientation: orientation,
                id,
            };
            dispatch(updatePlaylistAction(data))
                .unwrap()
                .then((res) => {
                    msg.success("Playlist has been updated", 2);
                    setLoading(false);
                    navigateBack();
                    navigate(`/${RouterPaths.playlists}${res.data.data.id}`);
                })
                .catch((error: any) => {
                    msg.error(`Error - ${error}`, 10);
                    setLoading(false);
                });
        } else {
            const data = {
                title,
                videos: videosSelected,
                state: "published",
                integrationType: playlistLayout,
                orientation: orientation,
            };
            dispatch(createPlaylistAction(data))
                .unwrap()
                .then((res) => {
                    // if (res && res && res.id) {
                    console.log("res test test", res);
                    console.log("res.id", res.data);
                    msg.success("New Playlist has been created", 2);
                    setLoading(false);
                    navigate(`/${RouterPaths.playlists}${res.data.id}`);
                    // }
                })
                .catch((error) => {
                    console.log({ error });
                    msg.error(`Error - ${error.response}`, 10);
                    //msg.error(`Error - ${error.response?.data.message}`, 10);
                    setLoading(false);
                });
        }
    };

    /**
     * Function to closing Playlist creation/updation page
     * @function handleCancel
     */
    const handleCancel = () => {
        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to Cancel? Your changes won't be saved! ",
            okText: "Yes",
            cancelText: "No",
            onOk: () => navigateBack(),
        });
    };

    /**
 * Function called when Form 1 is modified to check for
 * Playlist error
  /**
 * @function handleFormChange
 */
    const handleFormChange = () => {
        // console.log(form1.getFieldsError()[0].errors.length);
        setPlaylistErr(!!form1.getFieldsError()[0].errors.length);
        //}
    };

    return (
        <div style={{ height: "calc(100vh - 150px)" }}>
            {editModeLoading ? (
                <Row
                    style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        alignItems: "center",
                    }}
                >
                    <Col style={{ width: "100%" }}>
                        <Spin size={"default"} style={{ textAlign: "center" }} />
                    </Col>
                </Row>
            ) : (
                <Space direction={"vertical"} size={12} style={{ width: "100%" }}>
                    <Row align="middle" gutter={[10, 0]}>
                        <Col>
                            <Typography.Title level={3}>{editMode ? "Edit" : "Create"} Playlist</Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row style={{ margin: "1rem 0 1rem" }}>
                                <Col style={{ width: "100%" }}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>
                                            Playlist Name
                                        </Typography.Title>
                                    </Row>
                                    <Row>
                                        <Typography.Text>
                                            Naming your playlists will help you stay organized.
                                        </Typography.Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Form
                                name="createPlaylist"
                                labelCol={{ span: 24 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                form={form1}
                                onFieldsChange={handleFormChange}
                                style={{ textAlign: "left", marginTop: "5px" }}
                            >
                                <Form.Item
                                    name="playlistName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Playlist name required!",
                                            validateTrigger: "onChange",
                                        },
                                        {
                                            max: 50,
                                            message: "Playlist name exceed 50 characters in length.",
                                        },
                                    ]}
                                    validateTrigger={["onChange"]}
                                    style={{ margin: 0 }}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Name Your Playlist"
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        defaultValue={title}
                                        value={title}
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Row>
                                <Col style={{ width: "100%" }}>
                                    <Row style={{ margin: "2rem 0 1rem" }}>
                                        <Col style={{ width: "100%" }}>
                                            <Row>
                                                <Typography.Title level={5} style={{ margin: 0 }}>
                                                    Select Type of Playback
                                                </Typography.Title>
                                            </Row>
                                            <Row>
                                                <Typography.Text>
                                                    Please select a layout option from below to display the videos
                                                </Typography.Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    flex="auto"
                                    className="site-card-wrapper"
                                    style={{ borderRadius: "0.5rem", margin: 0 }}
                                >
                                    <Row gutter={16} justify="center">
                                        {layoutArray.map((el: { name: string; image: any }, i) => (
                                            <Col key={i}>
                                                <Card
                                                    bordered
                                                    hoverable={
                                                        el.name === PlaylistLayoutType.carousel ||
                                                        el.name === PlaylistLayoutType.grid
                                                    }
                                                    cover={
                                                        <img
                                                            alt={el.name}
                                                            src={el.image}
                                                            style={{
                                                                aspectRatio: "3/2.2",
                                                                objectFit: "cover",
                                                                height: 150,
                                                                filter: "hue-rotate(46deg)",
                                                            }}
                                                        />
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            el.name === PlaylistLayoutType.carousel ||
                                                            el.name === PlaylistLayoutType.grid
                                                        )
                                                            setPlaylistLayout(el.name);
                                                    }}
                                                    style={{
                                                        width: 200,
                                                        opacity:
                                                            el.name === PlaylistLayoutType.carousel ||
                                                            el.name === PlaylistLayoutType.grid
                                                                ? 1
                                                                : 0.5,
                                                        border:
                                                            el.name === playlistLayout
                                                                ? "0.3rem double #F2994A"
                                                                : "0.3rem double #ececec",
                                                    }}
                                                    bodyStyle={{ textAlign: "center", padding: "1rem" }}
                                                >
                                                    <Card.Meta
                                                        title={el.name.split("_").join(" ")}
                                                        style={{ textTransform: "capitalize" }}
                                                    />
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Row style={{ margin: "2rem 0 1rem" }}>
                            <Col style={{ width: "100%" }}>
                                <Row>
                                    <Typography.Title level={5} style={{ margin: 0 }}>
                                        Select Playlist Orientation
                                    </Typography.Title>
                                </Row>
                                <Row>
                                    <Typography.Text>Please select the orientation of the playlist.</Typography.Text>
                                </Row>
                                <Radio.Group
                                    onChange={onOrientationChange}
                                    value={orientation}
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    <Space style={{ paddingTop: "1.1rem" }}>
                                        <Radio value={"portrait"} style={{ fontSize: "inherit" }}>
                                            Portrait
                                        </Radio>
                                        <Radio value={"landscape"} style={{ fontSize: "inherit" }}>
                                            Landscape
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col style={{ width: "100%" }}>
                            <Row style={{ margin: "2rem 0 1rem" }}>
                                <Col style={{ width: "100%" }}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>
                                            Select Videos
                                        </Typography.Title>
                                    </Row>
                                    <Row>
                                        <Typography.Text>
                                            Please select the videos from the video-library to add to the playlist.
                                        </Typography.Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ margin: "1rem 0 2rem" }}>
                                <Col
                                    style={{
                                        background: "#ececec",
                                        padding: "1rem",
                                        borderRadius: "0.5rem",
                                        width: "100%",
                                    }}
                                >
                                    <Row>
                                        <Col style={{ width: "100%", overflow: "auto" }}>
                                            <Row>
                                                <Col style={{ width: "100%" }}>
                                                    <Divider orientation="left">
                                                        <Typography.Text
                                                            type={"secondary"}
                                                            strong={false}
                                                            style={{ fontWeight: 400 }}
                                                        >
                                                            Selected ({videosSelected.length})
                                                        </Typography.Text>
                                                    </Divider>
                                                </Col>
                                            </Row>
                                            <Row
                                                // gutter={[8,8]}
                                                style={{
                                                    borderRadius: "0.5rem",
                                                    flexWrap: "nowrap",
                                                    background: videosSelected.length === 0 ? "none" : "#f2994b80",
                                                    alignItems: "center",
                                                    justifyContent: videosSelected.length === 0 ? "center" : "start",
                                                    border: "2px solid #f2994b80",
                                                    overflow: "auto",
                                                    minHeight: 202,
                                                }}
                                            >
                                                {videosSelected.length === 0 ? (
                                                    <Col>
                                                        <Typography.Text
                                                            type={"secondary"}
                                                            strong={false}
                                                            style={{ fontWeight: 400 }}
                                                        >
                                                            No videos are selected. Add videos from the bottom video
                                                            library
                                                        </Typography.Text>
                                                    </Col>
                                                ) : null}
                                                {videosSelected.map((el, i) => (
                                                    <Col
                                                        key={i}
                                                        {...(orientation === "landscape"
                                                            ? {
                                                                  md: 6,
                                                                  lg: 5,
                                                                  xl: 4,
                                                                  xxl: 3,
                                                              }
                                                            : {
                                                                  md: 4,
                                                                  lg: 4,
                                                                  xl: 3,
                                                                  xxl: 2,
                                                              })}
                                                        style={{
                                                            padding: "0.15rem",
                                                        }}
                                                    >
                                                        <SelectVideoCard
                                                            orientationOfCard={orientation}
                                                            cardData={el}
                                                            selectType={"remove"}
                                                            cardDataArray={videosSelected}
                                                            setCardDataArray={() =>
                                                                setVideosSelected([
                                                                    ...videosSelected.filter((val) => val.id !== el.id),
                                                                ])
                                                            }
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: "2rem 0 0" }}>
                                        <Col style={{ width: "100%" }}>
                                            <Row>
                                                <Col style={{ width: "100%" }}>
                                                    <Divider orientation="left">
                                                        <Typography.Text
                                                            type={"secondary"}
                                                            strong={false}
                                                            style={{
                                                                fontWeight: 400,
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            {RouterPaths.videoLibrary.split("-").join(" ")}
                                                        </Typography.Text>
                                                    </Divider>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: "0 0 0.6rem" }}>
                                                <Col>
                                                    <SearchBox
                                                        iconOnly
                                                        inputProps={{
                                                            placeholder: "Search by name or tags",
                                                        }}
                                                        loading={searchVideosLoading}
                                                        onInputChangeCallback={onSearch}
                                                        // onInputChangeCallback={searchFn}
                                                        onClickCallback={onSearch}
                                                    />
                                                </Col>
                                                <Col style={{ paddingLeft: "1rem" }}>
                                                    <Select
                                                        style={{ width: "12rem" }}
                                                        allowClear
                                                        showSearch
                                                        placeholder="Filter By Orientation"
                                                        optionFilterProp="children"
                                                        onChange={(e: PlaylistOrientation) => {
                                                            getVideos({ orientation: e, q });
                                                            setOrientation(e);
                                                        }}
                                                        value={orientation}
                                                    >
                                                        <Select.Option value="portrait">Portrait</Select.Option>
                                                        <Select.Option value="landscape">Landsape</Select.Option>
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row
                                                // gutter={[8,8]}
                                                style={{
                                                    padding: "0.2rem 0",
                                                    minHeight: 230,
                                                    // maxHeight: 450,
                                                    // maxHeigh: 230,
                                                    flexFlow: "unset",
                                                    alignItems: "center",
                                                    overflow: "auto",
                                                }}
                                            >
                                                {searchVideosLoading ? (
                                                    <Col style={{ width: "100%", textAlign: "center" }}>
                                                        <Spin size={"small"} />
                                                    </Col>
                                                ) : videosDefaultList.length === 0 ? (
                                                    <Col style={{ width: "100%", textAlign: "center" }}>
                                                        <Typography.Text
                                                            type={"secondary"}
                                                            strong={false}
                                                            style={{ fontWeight: 400 }}
                                                        >
                                                            No videos are available.
                                                        </Typography.Text>
                                                    </Col>
                                                ) : null}
                                                {!searchVideosLoading &&
                                                    videosDefaultList
                                                        .filter((e) => !videosSelected.find((val) => val.id === e.id))
                                                        .map((el, i) => (
                                                            <Col
                                                                key={i}
                                                                {...(orientation === "landscape"
                                                                    ? {
                                                                          md: 6,
                                                                          lg: 5,
                                                                          xl: 4,
                                                                          xxl: 3,
                                                                      }
                                                                    : {
                                                                          md: 4,
                                                                          lg: 4,
                                                                          xl: 3,
                                                                          xxl: 2,
                                                                      })}
                                                                style={{
                                                                    padding: "0.15rem",
                                                                }}
                                                            >
                                                                {cardLoading ? (
                                                                    <Row style={{ background: "yellow !important" }}>
                                                                        <Spin />
                                                                    </Row>
                                                                ) : (
                                                                    <SelectVideoCard
                                                                        orientationOfCard={orientation}
                                                                        cardData={el}
                                                                        selectType={"add"}
                                                                        cardDataArray={videosSelected}
                                                                        setCardDataArray={() =>
                                                                            setVideosSelected([...videosSelected, el])
                                                                        }
                                                                    />
                                                                )}
                                                            </Col>
                                                        ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row justify="center" align="middle" style={{ padding: "1rem 0 0" }}>
                                        <Pagination
                                            pageSize={perPage}
                                            current={currentPage}
                                            size="small"
                                            total={getVideosLength}
                                            onChange={onPageChange}
                                            showTotal={showTotal}
                                            showSizeChanger={false}
                                            responsive
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 0]} style={{ padding: "0.5rem 0 2rem" }}>
                        <Col>
                            <Button
                                type="default"
                                onClick={handleCancel}
                                style={{ width: "10rem", borderRadius: ".5rem" }}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                loading={loading}
                                onClick={handleCreate}
                                // disabled={playlistErr}
                                disabled={!title || !orientation || !playlistLayout || videosSelected.length === 0}
                                style={{ width: "10rem", borderRadius: ".5rem" }}
                            >
                                {editMode ? "Update" : "Create"}
                            </Button>
                        </Col>
                    </Row>
                </Space>
            )}
        </div>
    );
}
