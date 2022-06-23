import React, { useState, useEffect } from "react";
import "./UploadVideo.css";
import {
    Form,
    Input,
    Upload,
    Collapse,
    message as msg,
    Card,
    Badge,
    Select,
    Image,
    Divider,
    Col,
    Row,
    Space,
    Typography,
    Progress,
    notification,
    Modal,
    Switch,
    Radio,
} from "antd";
import _ from "lodash";
import { InboxOutlined, UploadOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { NavigateFunction } from "../VideoLibrary";
import { useAppDispatch } from "../../../Shared/Redux/store";
import Button from "../../../Components/Partials/Button";
import { RouterPaths } from "../../../api/RouterPaths";
import { useNavigate } from "react-router-dom";
import { useCallbackPrompt } from "../../../Shared/hooks/useCallbackPrompt";
import listPlaylistAction from "../../../Shared/Redux/Actions/playlist/listPlaylist.action";
import getBrandTagsAction from "../../../Shared/Redux/Actions/feed/getBrandsTags.action";
import createUploadRequestAction, {
    createUploadRequestService,
} from "../../../Shared/Redux/Actions/feed/uploadVideo/createUploadRequest.action";
import {
    uploadFileUsingUploadReqIdAction,
    uploadFileUsingUploadReqIdService,
} from "../../../Shared/Redux/Actions/feed/uploadVideo/uploadFileUsingUploadReqId.action";
import {
    verifyUploadReqAction,
    VerifyUploadReqResponseType,
    verifyUploadReqService,
} from "../../../Shared/Redux/Actions/feed/uploadVideo/verifyUplodReqId.action";
import {
    getVideoThumbnailAction,
    GetVideoThumbnailResponse,
} from "../../../Shared/Redux/Actions/feed/uploadVideo/getVideoThumbnail.action";
import { createVideoFeedService } from "../../../Shared/Redux/Actions/feed/uploadVideo/createVideoFeed.service";
import ReactVideoPlayer from "../../../Components/VideoPlayer/ReactVideoPlayer";
import VideoPlayer from "../../../Components/VideoPlayer/VideoPlayer";
import DialogBox from "../../../Components/DialogBox";
import VideoOverlayOptModal from "../../../Shared/Models/VideoCardOverlay/VideoOverlayOptModal";
import VideoOverlayModal from "../../../Shared/Models/VideoCardOverlay/VideoOverlayModal";
import CreateVideoForm from "../../../Components/Forms/CreateVideoForm";
import YouTubeLinkForm from "../../../Components/Forms/YouTubeLinkForm";
import { uploadFile } from "../../ProfilePage/ProfileImage";

export default function UploadVideo() {
    const { Dragger } = Upload;
    const { Text, Title } = Typography;
    const { Option } = Select;
    const { Panel } = Collapse;
    const dispatch = useAppDispatch();
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [youTubeLink, setYouTubeLink] = useState("");
    const [videoThumbnailURL, setVideoThumbnailURL] = useState("");
    const [uploadCancel, setUploadCancel] = useState(false);
    const [ctaBtnUrl, setCtaBtnUrl] = useState("");
    const [ctaBtnTitle, setCtaBtnTitle] = useState("");
    const [uploadVideoErr, setUploadVideoErr] = useState(false);
    const [videoThumbnailId, setVideoThumbnailId] = useState(-1);
    const [hashtags, setHashtags] = useState<any | []>([]);
    const [editFlag, setEditFlag] = useState(false);
    const [isVideoOverlaysVisible, setIsVideoOverlaysVisible] = useState(false);
    const [captionErr, setCaptionErr] = useState(true);
    const [descriptionErr, setDescriptionErr] = useState(true);
    const [uploadReqIdResVideo, setUploadReqIdResVideo] = useState(-1);
    const [uploadReqIdResPoster, setUploadReqIdResPoster] = useState(-1);
    const [thumbnailId, setThumbnailId] = useState(-1);
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [playlists, setPlaylists] = useState<any | []>([]);
    const [tempPlaylist, setTempPlaylist] = useState<any | []>([]);
    const [tempTag, setTempTag] = useState<any | []>([]);
    const [overlaysOpt, setOverlaysOpt] = useState(0);
    const [isVideoOverlaysOptVisible, setIsVideoOverlaysOptVisible] = useState(false);
    const [titleErr, setTitleErr] = useState(true);
    const [linkErr, setLinkErr] = useState(true);
    const [orientation, setOrientation] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);
    const [form1] = Form.useForm();
    const [form3] = Form.useForm();
    const [form4] = Form.useForm();
    let tags: any, playlistIds: any, formData: any;
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        getPlaylist();
        getHashTags();
    }, []);

    /**
 * Props for video upload section
  /**
  * @constant
  * @type {object}
  * @default   
*/
    const props = {
        name: "videofile",
        multiple: false,
        //accept: 'video/*',
        accept: ".mp4,.mov,.mkv,.wmv,.flv,.avi",
        maxCount: 1,
        showUploadList: false,

        /**
 * Checks file type before uploading
  /**
 * @function beforeUpload
 * @param {any} file - Passing file
 * @returns {boolean} - Returns true for a valid file
 */
        beforeUpload(file: any): boolean {
            console.log({ file });
            if (
                file.type === "video/mp4" ||
                file.type === "video/mov" ||
                file.type === "video/mkv" ||
                file.type === "video/wmv" ||
                file.type === "video/flv" ||
                file.type === "video/avi"
            ) {
                return true;
            } else {
                notification["error"]({
                    message: "File type error",
                    description: "Only mp4, mov, mkv, wmv, flv, avi file extensions are allowed",
                    placement: "topRight",
                });
                return false;
            }
        },
    };

    /**
 * Props for Thumbnail upload section
  /**
  * @constant
  * @type {object}
  * @default   
*/
    const posterProps = {
        name: "posterfile",
        multiple: false,
        accept: ".jpg,.jpeg,.png",
        maxCount: 1,

        /**
 * Checks file type before uploading
  /**
 * @function beforeUpload
 * @param {any} file - Passing file
 * @returns {boolean} - Returns true for a valid file
 */
        beforeUpload(file: any): boolean {
            //console.log({ File });
            if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
                return true;
            } else {
                notification["error"]({
                    message: "File type error",
                    description: "Only jpg, jpeg, png file extensions are allowed",
                    placement: "topRight",
                });
                file.status = "error";
                return false;
            }
        },
    };

    /**
     * To fetch all Playlist's
     * @function getPlaylist
     */
    const getPlaylist = () => {
        dispatch(listPlaylistAction())
            .unwrap()
            .then((response: any) => {
                //console.log('getPlaylist res: ' + JSON.stringify(response));
                setPlaylists(response);
            });
    };

    /**
     * To fetch all HashTags
     * @function getHashTags
     */
    const getHashTags = () => {
        dispatch(getBrandTagsAction())
            .unwrap()
            .then((res) => {
                if (res) {
                    setHashtags(res.data);
                }
                // console.log('getVideos response: ' + JSON.stringify(response));
                // setHashtags([]);
            });
    };

    /**
     * Function called to display Overlays Modal
     * @function handleVideoOverlays
     */
    const handleVideoOverlays = () => {
        //setIsCreateVideoVisible(false);
        setIsVideoOverlaysVisible(true);
    };

    /**
     * Function to closing Upload video section
     * @function handleCancel
     */
    const handleCancel = () => {
        navigate("/" + RouterPaths.videoLibrary);
    };

    /**
 * Function called when playlist is selected under playlist section
  /**
 * @function onPlaylistSelect
 * @param {any} value 
 */
    function onPlaylistSelect(value: any) {
        setShowDialog(true);
        setTempPlaylist(Object.assign(value.map((val: any) => val.key)));
    }

    /**
 * Function called when Form 4 is modified to check for validation errors in Caption and Description
  /**
 * @function handleForm4Change
 */
    const handleForm4Change = () => {
        setCaptionErr(form4.getFieldsError()[0].errors.length ? true : false);
        setDescriptionErr(form4.getFieldsError()[1].errors.length ? true : false);
    };

    /**
 * Function called when Form 3 is modified to check for validation errors in Caption and Description
  /**
 * @function handleForm3Change
 */
    const handleForm3Change = () => {
        setCaptionErr(form3.getFieldsError()[0].errors.length ? true : false);
        setDescriptionErr(form3.getFieldsError()[1].errors.length ? true : false);
    };

    /**
 * Function called when HashTags are selected
  /**
 * @function handleHashTagChange
 * @param {string} value 
 */
    const handleHashTagChange = (value: string) => {
        setShowDialog(true);
        setTempTag(
            _.remove(_.split(value, ","), function (value: string) {
                return value !== "" && value !== " ";
            })
        );
    };

    /**
 * Function called when a Video file or Thumbnail image file is uploaded
  /**
 * @function customRequest
 * @param {any} e - File details
 * @param {string} type - File type Video/Thumbnail
 * @throws Will throw an error File upload fails
 */

    const customRequest = async (e: any, type: string, generateSnapShot: boolean = false) => {
        // console.log({ type, generateSnapShot });
        if (!e.file) return;
        try {
            const { original, id } = await uploadFile(e.file, (progress) => {
                // console.log("progress======>>>>", progress);
                e.onSuccess();
                if (type === "video") {
                    setTimeout(() => setCurrentStep(progress * 20), 1000);
                }
            });
            if (type === "video") {
                setUploadReqIdResVideo(id);
                setVideoURL(original);
            }
            if (generateSnapShot) {
                const { data }: { data: GetVideoThumbnailResponse } = await dispatch(
                    getVideoThumbnailAction({ file: original })
                ).unwrap();
                setVideoThumbnailId(data.id);
                setVideoThumbnailURL(data.urls.original);
                setShowDialog(true);
            } else {
                setUploadReqIdResPoster(id);
                setThumbnailId(id);
                setThumbnailURL(original);
            }
        } catch (error) {
            console.error("File upload failed");
        }
    };

    console.log("thumbnailId", thumbnailId);
    /**
     * Function called to save details about a new Video
     * @function handleCreateVideo
     */
    const handleCreateVideo = () => {
        let uploadReqIdRes: number, newPosterId: number;

        // For Thumbnail
        if (uploadReqIdResPoster !== -1) {
            createVideoDispatch(thumbnailId);
        } else {
            createVideoDispatch(null).then((response: any) => {
                createVideoDispatch(response.id).then(() => {
                    //setUrl('');
                    setYouTubeLink("");
                });
            });
        }
    };
    /**
 * Dispatcher called when new Video is Uploaded
  /**
 * @async
 * @function createVideoDispatch
 * @param {any} posterId - Poster Id 
 * @throws Will throw an error when video upload fails
 */
    const createVideoDispatch = async (posterId: any) => {
        tags = Object.assign(tempTag.map((key: any) => ({ value: key })));
        if (posterId === null && videoThumbnailId !== -1) {
            posterId = videoThumbnailId;
        }
        playlistIds = tempPlaylist;

        try {
            const res = await createVideoFeedService({
                resourceId: uploadReqIdResVideo,
                youtubeUrl: youTubeLink,
                caption,
                description,
                ctaBtnUrl,
                ctaBtnTitle,
                posterId,
                tags,
                playlistIds,
                orientation,
            });
            //console.log('res', res);
            msg.success("Video uploaded successfully", 2);
            //setResetModal(true);
            setYouTubeLink(res.data.youtubelink);
            navigate("/" + RouterPaths.videoLibrary);
        } catch (error) {
            setLoading(false);
            console.error("createVideoDispatch", error);
        }
    };

    /**
 *  Function called when video orientation is selected
  /**
 * @function selectOrientation
 * @param {any} e - Radio button value
*/
    const selectOrientation = (e: any) => {
        console.log("radio checked", e.target.value);
        setOrientation(e.target.value);
    };

    return (
        <div className="site-layout-background" style={{ padding: "2vh 1vw", minHeight: "74vh" }}>
            <Divider>
                <Typography.Title level={4}>Upload Video</Typography.Title>
            </Divider>

            <Row justify="center">
                <Col span={9}>
                    <Card
                        className={"global_box_shadow"}
                        bodyStyle={{ padding: "2rem", textAlign: "center" }}
                        style={{
                            width: "26vw",
                            minHeight: "34vw",
                            height: "fit-content",
                            backgroundColor: "#f5f5f5",
                            padding: "0.6vw 0px",
                        }}
                    >
                        {(videoURL === "" && currentStep === 0) || uploadCancel ? (
                            <>
                                <Row justify="center">
                                    <Col>
                                        {!youTubeLink && (
                                            <>
                                                <Dragger
                                                    {...props}
                                                    customRequest={(e) => {
                                                        customRequest(e, "video", true);
                                                        setCurrentStep(0);
                                                        setUploadVideoErr(false);
                                                        setUploadCancel(false);
                                                        setShowDialog(true);
                                                    }}
                                                    listType="text"
                                                    style={{ padding: "10px" }}
                                                    method="PUT"
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <Text>Click or drag file to this area to upload</Text>
                                                </Dragger>
                                            </>
                                        )}
                                    </Col>
                                </Row>

                                {!youTubeLink && (
                                    <Row justify="center">
                                        <Col>
                                            <Title style={{ padding: "1rem 0 0.2rem" }} level={3}>
                                                OR
                                            </Title>
                                        </Col>
                                    </Row>
                                )}
                                <Row justify="center">
                                    <Col flex="auto">
                                        <YouTubeLinkForm
                                            form1={form1}
                                            youTubeLink={youTubeLink}
                                            setVideoThumbnailURL={setVideoThumbnailURL}
                                            setYouTubeLink={setYouTubeLink}
                                            setShowDialog={setShowDialog}
                                        />
                                    </Col>
                                </Row>
                            </>
                        ) : currentStep === 2000 && !uploadCancel ? (
                            <div
                                className="video-container1 outer-max-width"
                                id="video-container"
                                style={{
                                    margin: orientation === "landscape" ? "10vw auto auto auto" : "auto",
                                }}
                            >
                                <VideoPlayer
                                    url={videoURL}
                                    title={""}
                                    cta={ctaBtnTitle ? ctaBtnTitle : ""}
                                    ctaURL={ctaBtnUrl ? ctaBtnUrl : ""}
                                    id={0}
                                    shareEnabled={false}
                                    videoOrientation={orientation}
                                />
                            </div>
                        ) : (
                            <div style={{ padding: "6vh 4.5vw", marginTop: "6vw" }}>
                                <Progress
                                    type="circle"
                                    strokeColor={uploadVideoErr ? "#a8071a" : "#F2994A"}
                                    percent={currentStep}
                                    status={
                                        uploadVideoErr
                                            ? "exception"
                                            : (currentStep >= 0 && currentStep) <= 100
                                            ? "active"
                                            : "success"
                                    }
                                />
                            </div>
                        )}
                        {youTubeLink && (
                            <div
                                className={`${
                                    orientation === "landscape" ? "removeHeight" : ""
                                } video-container outer-max-width`}
                                id="video-container"
                            >
                                <ReactVideoPlayer url={youTubeLink} />
                            </div>
                        )}
                        <Row
                            justify="center"
                            style={{
                                marginTop: videoURL === "" || uploadCancel === true ? "5px" : "-2px",
                            }}
                        >
                            {!youTubeLink && (
                                <Col>
                                    {(videoURL === "" && currentStep === 0) || uploadCancel === true ? (
                                        <Col style={{ padding: "1rem 0" }}>
                                            <Title level={5}>Upload Guidelines</Title>
                                            <Badge color="gray" text="Max file 100mb" />
                                            <br />
                                            <Badge color="gray" text="Video length: 03-60 sec" />
                                            <br />
                                            <Badge color="gray" text="MP4 format supported" />
                                            <br />
                                            <Badge color="gray" text="Video ratio 9:16" />
                                            <br />
                                        </Col>
                                    ) : null}
                                </Col>
                            )}
                        </Row>
                        {(videoURL && !uploadCancel) || uploadVideoErr || youTubeLink ? (
                            <Row justify="center">
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="middle"
                                    style={{
                                        fontWeight: "bold",
                                        backgroundColor: "#F2994A",
                                        width: "8rem",
                                        margin: "1rem",
                                    }}
                                    onClick={() => {
                                        form1.resetFields(["youtubeUrl"]);
                                        setVideoURL("");
                                        setVideoThumbnailId(-1);
                                        setCurrentStep(0);
                                        setUploadCancel(true);
                                        setUploadVideoErr(false);
                                        setYouTubeLink("");
                                        setVideoThumbnailURL("");
                                        setOrientation("");
                                    }}
                                >
                                    {uploadVideoErr ? "Re-Upload Video" : "Remove Video"}
                                </Button>
                            </Row>
                        ) : null}
                        {ctaBtnUrl === "" && ctaBtnTitle === "" ? (
                            <Row justify="center">
                                <Button
                                    type="primary"
                                    shape="round"
                                    htmlType="submit"
                                    size="middle"
                                    block={false}
                                    style={{
                                        fontWeight: "bold",
                                        backgroundColor: "#F2994A",
                                    }}
                                    icon={<AppstoreAddOutlined />}
                                    onClick={() => {
                                        handleVideoOverlays();
                                        setEditFlag(false);
                                    }}
                                >
                                    Video Overlays
                                </Button>
                            </Row>
                        ) : (
                            <Row justify="center">
                                <Space direction="horizontal">
                                    <Button
                                        type="primary"
                                        shape="round"
                                        htmlType="submit"
                                        size="middle"
                                        block={false}
                                        style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#F2994A",
                                            marginRight: "5px",
                                        }}
                                        onClick={() => {
                                            handleVideoOverlays();
                                            setEditFlag(false);
                                        }}
                                    >
                                        Change CTA
                                    </Button>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        htmlType="submit"
                                        size="middle"
                                        block={false}
                                        style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#F2994A",
                                            marginLeft: "5px",
                                        }}
                                        onClick={() => {
                                            setCtaBtnUrl("");
                                            setCtaBtnTitle("");
                                            handleForm4Change();
                                        }}
                                    >
                                        Remove CTA
                                    </Button>
                                </Space>
                            </Row>
                        )}
                    </Card>
                </Col>
                <Col span={10}>
                    <div style={{ minHeight: "53.7vh" }}>
                        <CreateVideoForm
                            form3={form3}
                            handleForm3Change={handleForm3Change}
                            caption={caption}
                            setCaption={setCaption}
                            setShowDialog={setShowDialog}
                            description={description}
                            setDescription={setDescription}
                            descriptionErr={descriptionErr}
                            setUploadReqIdResPoster={setUploadReqIdResPoster}
                            handleHashTagChange={handleHashTagChange}
                            hashtags={hashtags}
                            selectOrientation={selectOrientation}
                            posterProps={posterProps}
                            customRequest={customRequest}
                            // customRequest={customRequest22}
                            setThumbnailId={setThumbnailId}
                            setThumbnailURL={setThumbnailURL}
                            uploadReqIdResPoster={uploadReqIdResPoster}
                            videoThumbnailId={videoThumbnailId}
                            videoThumbnailURL={videoThumbnailURL}
                            thumbnailId={thumbnailId}
                            thumbnailURL={thumbnailURL}
                            playlists={playlists}
                            onPlaylistSelect={onPlaylistSelect}
                            getPlaylist={getPlaylist}
                        />
                    </div>
                    <Row justify="end" gutter={[10, 0]}>
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleCancel();
                                }}
                                style={{
                                    fontWeight: "bold",
                                    backgroundColor: "#F2994A",
                                    marginTop: playlists.length === 0 ? "15px" : "",
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setShowDialog(false);
                                    setLoading(true);
                                    handleCreateVideo();
                                }}
                                loading={loading}
                                disabled={
                                    (form3.getFieldsValue().caption &&
                                        captionErr === false &&
                                        descriptionErr === false &&
                                        videoURL !== "" &&
                                        uploadCancel !== true &&
                                        orientation !== "") ||
                                    (form3.getFieldsValue().caption &&
                                        captionErr === false &&
                                        youTubeLink &&
                                        orientation !== "")
                                        ? false
                                        : true
                                }
                                style={{
                                    fontWeight: "bold",
                                    backgroundColor: "#F2994A",
                                    marginTop: playlists.length === 0 ? "15px" : "",
                                }}
                            >
                                Upload
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <>
                <VideoOverlayModal
                    isVideoOverlaysVisible={isVideoOverlaysVisible}
                    setOverlaysOpt={setOverlaysOpt}
                    setIsVideoOverlaysVisible={setIsVideoOverlaysVisible}
                    setIsVideoOverlaysOptVisible={setIsVideoOverlaysOptVisible}
                    setTitleErr={setTitleErr}
                    setLinkErr={setLinkErr}
                />

                <VideoOverlayOptModal
                    edit={false}
                    editVideo={null}
                    //setNewCTABtn={null}
                    //setReload={null}
                    isVideoOverlaysOptVisible={isVideoOverlaysOptVisible}
                    overlaysOpt={overlaysOpt}
                    editFlag={editFlag}
                    titleErr={titleErr}
                    handleFormChange={handleForm4Change}
                    setEditFlag={setEditFlag}
                    setShowDialog={setShowDialog}
                    setTitleErr={setTitleErr}
                    setCtaBtnUrl={setCtaBtnUrl}
                    setCtaBtnTitle={setCtaBtnTitle}
                    setIsVideoOverlaysOptVisible={setIsVideoOverlaysOptVisible}
                    setOverlaysOpt={setOverlaysOpt}
                    setIsVideoOverlaysVisible={setIsVideoOverlaysVisible}
                />

                <DialogBox
                    // @ts-ignore
                    showDialog={showPrompt}
                    confirmNavigation={confirmNavigation}
                    cancelNavigation={cancelNavigation}
                />
            </>
        </div>
    );
}
