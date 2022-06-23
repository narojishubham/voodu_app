import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import "./VideoDetailsViewEdit.css";
import {
    Form,
    Collapse,
    message as msg,
    Select,
    Divider,
    Col,
    Row,
    Typography,
    Button as AntButton,
    notification,
    Spin,
} from "antd";
import _ from "lodash";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../Shared/Redux/store";
import { useCallbackPrompt } from "../../../Shared/hooks/useCallbackPrompt";
import { RouterPaths } from "../../../api/RouterPaths";
import Button from "../../../Components/Partials/Button";
import listPlaylistAction from "../../../Shared/Redux/Actions/playlist/listPlaylist.action";
import getBrandTagsAction from "../../../Shared/Redux/Actions/feed/getBrandsTags.action";
import getVideoByIdAction from "../../../Shared/Redux/Actions/playlist/getVideoById.action";
import { verifyUploadReqAction } from "../../../Shared/Redux/Actions/feed/uploadVideo/verifyUplodReqId.action";
import {
    getVideoThumbnailAction,
    GetVideoThumbnailResponse,
} from "../../../Shared/Redux/Actions/feed/uploadVideo/getVideoThumbnail.action";
import updateVideoAction from "../../../Shared/Redux/Actions/feed/updateVideo.action";
import VideoDetailCard from "../../../Components/VideoDetailCard";
import EditVideoDetailsForm from "../../../Components/Forms/EditVideoDetailsForm";
import VideoOverlayModal from "../../../Shared/Models/VideoCardOverlay/VideoOverlayModal";
import VideoOverlayOptModal from "../../../Shared/Models/VideoCardOverlay/VideoOverlayOptModal";
import DialogBox from "../../../Components/DialogBox";
import { uploadFile } from "../../ProfilePage/ProfileImage";

export default function VideoDetailsViewEdit() {
    const navigate = useNavigate();
    let { videoId } = useParams();
    const dispatch = useAppDispatch();
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [videoThumbnailURL, setVideoThumbnailURL] = useState("");
    const [ctaBtnUrl, setCtaBtnUrl] = useState("");
    const [ctaBtnTitle, setCtaBtnTitle] = useState("");
    const [videoThumbnailId, setVideoThumbnailId] = useState(-1);
    const [hashtags, setHashtags] = useState<any | []>([]);
    const [editFlag, setEditFlag] = useState(false);
    const [ctaBtn, setCtaBtn] = useState<boolean>();
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
    const [posterURL, setPosterURL] = useState("");
    const [formDisable, setFormDisable] = useState<boolean>();
    const [isEditVideoDetailsVisible, setIsEditVideoDetailsVisible] = useState(false);
    const [editVideo, setEditVideo] = useState<any | []>([]);
    const [editFormFieldChange, setEditFormFieldChange] = useState(false);
    const [reload, setReload] = useState({});
    const [overlaysOpt, setOverlaysOpt] = useState(0);
    const [reset, setReset] = useState(true);
    const [isVideoOverlaysOptVisible, setIsVideoOverlaysOptVisible] = useState(false);
    const [titleErr, setTitleErr] = useState(true);
    const [linkErr, setLinkErr] = useState(true);
    const [isCreateVideoVisible, setIsCreateVideoVisible] = useState(false);
    const [resetCTABtn, setResetCTABtn] = useState(false);
    const [fieldChanged, setFieldChanged] = useState("default");
    const [showDialog, setShowDialog] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);
    const [form1] = Form.useForm();
    let tags: any,
        playlistIds: any,
        formData: any,
        urlElements: string[],
        newCTABtnUrl: string,
        newCTABtnTitle: string,
        newDescription: string;

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
        beforeUpload(file: any) {
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
            .then((response: any) => {
                //console.log('getVideos response: ' + JSON.stringify(response));
                setHashtags(response.data);
            });
    };

    /**
 * Function to get videos details
  /**
 * @function showVideoDetails
 * @throws Will throw an error when fetching video data fails
 */
    const showVideoDetails = () => {
        //setIsVideoDetailVisible(false);
        dispatch(getVideoByIdAction({ id: Number(videoId) }))
            .unwrap()
            .then((response: any) => {
                console.log("video video  getVideoByIdAction", response.data);

                setEditVideo(response.data);
                const { caption, description, tags } = response.data;

                form1.setFieldsValue({
                    caption: caption,
                    description: description,
                    hashtag: tags,
                });

                if (response.ctaBtnUrl === "" && response.ctaBtnTitle === "")
                    // Video Overlays button is visible under video card
                    setCtaBtn(true);
                else {
                    // Change CTA & Remove CTA button is visible under video card
                    setCtaBtn(false);
                }
                setPageLoading(false);
                //setIsEditVideoDetailsVisible(true);
            })
            .catch((error: any) => {
                console.log({ error });
                setPageLoading(false);
                error.onError();
            });
    };
    useLayoutEffect(() => {
        setPageLoading(true);
        showVideoDetails();
        getPlaylist();
        getHashTags();
        urlElements = window.location.href.split("/");
        //console.log({ urlElements });
        if (urlElements[5]) {
            setFormDisable(false);
        } else {
            setFormDisable(true);
        }
    }, []);

    /**
     * Function called to display Overlays Modal
     * @function handleVideoOverlays
     */
    const handleVideoOverlays = () => {
        //setIsCreateVideoVisible(false);
        setIsVideoOverlaysVisible(true);
    }; /*
 

  /**
   * Function to closing Edit Video details section
   * @function handleCancel
   */

    /**
 * Function to close Video Overlays Modal
  /**
 * @function handleVideoOverlaysCancel
*/ const handleCancel = () => {
        navigate(`/${RouterPaths.videoLibrary}`);
    };

    /**
     * Function called to reset form fields
     * @function resetForm
     */
    const resetForm = () => {
        setTempTag([]);
        setCtaBtnUrl("");
        setCtaBtnTitle("");
        setUploadReqIdResPoster(-1);
        setThumbnailId(-1);
        setThumbnailURL("");
        setUploadReqIdResVideo(-1);
        setPosterURL("");
        setCaption("");
        setDescription("");
        setFormDisable(true);
        setIsEditVideoDetailsVisible(false);
        setResetCTABtn(false);
        form1.resetFields();
        // form2.resetFields();
    };

    /**
 *  Function checks for errors on caption and description fields when form values are changed
  /**
 * @function handleForm1Change
*/
    const handleForm1Change = () => {
        //console.log(form1.getFieldsError());
        setCaptionErr(form1.getFieldsError()[0].errors.length ? true : false);
        setDescriptionErr(form1.getFieldsError()[1].errors.length ? true : false);
        setReload({}); // used to counter useState async issue by re rendering
        //}
    };

    /**
 * Function called when Video Overlays option is selected under Video Overlays Modal
  /**
 * @function handleVideoOverlaysOpt
*/
    const handleVideoOverlaysOpt = () => {
        setIsVideoOverlaysVisible(false);
        setIsVideoOverlaysOptVisible(true);
        setTitleErr(true);
        setLinkErr(true);
    };

    /**
 * Function checked for any field change and 
 * if no error found on Title and Description Enables
 * Save and update button
  /**
 * @function checkChange
 * @param {string} fieldChanged - Name of field that's been changed
 */
    const checkChange = (fieldChanged?: string) => {
        switch (fieldChanged) {
            case "Video Overlays": {
                //console.log('Video Overlays');
                if (captionErr === false && descriptionErr === false) {
                    //console.log('false');
                    setReset(false);
                    setShowDialog(true);

                    break;
                } else {
                    //console.log('true');
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Change CTA": {
                //console.log('Change CTA');
                if (captionErr === false && descriptionErr === false) {
                    //console.log('false');
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    //console.log('true');
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Remove CTA": {
                //console.log('Remove CTA');
                if (captionErr === false && descriptionErr === false) {
                    //console.log('false');
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    //console.log('true');
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Title": {
                if (captionErr === false && descriptionErr === false) {
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Description": {
                if (captionErr === false && descriptionErr === false) {
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "HashTags": {
                if (captionErr === false && descriptionErr === false) {
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Thumbnail": {
                if (thumbnailId > -1 && captionErr === false && descriptionErr === false) {
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            case "Playlist": {
                if (captionErr === false && descriptionErr === false) {
                    setReset(false);
                    setShowDialog(true);
                    break;
                } else {
                    setReset(true);
                    setShowDialog(true);
                    break;
                }
            }
            default: {
                setReset(true);
            }
        }
    };

    useEffect(() => {
        // console.log("useEffect called");
        checkChange(fieldChanged);
    }, [reload]);

    /**
 * Function called when HashTags are selected
  /**
 * @function handleHashTagChange
 * @param {string} value 
 */
    const handleHashTagChange = (value: string) => {
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

    // const customRequest = (e: any, type: string) => {
    //     createUploadRequestService({ filename: e.file.name })
    //         .then((response) => {
    //             console.log("createUploadRequestService");

    //             e.onSuccess();
    //             const { uploadUrl, id } = response.data.data;
    //             setUploadReqIdResPoster(id);
    //             const data = {
    //                 uploadUrl: uploadUrl,
    //                 file: e.file,
    //             };
    //             uploadFileUsingUploadReqIdService(data).then(() => {
    //                 console.log("uploadFileUsingUploadReqIdService");

    //                 verifyUploadReqService({ uploadReqIdRes: id })
    //                     .then((response: any) => {
    //                         setThumbnailId(response.id);
    //                         setThumbnailURL(response.urls.original);
    //                         setReload({}); // used to counter useState async issue by re rendering
    //                         console.log("verify");
    //                     })
    //                     .catch((e: any) => msg.error(e.message));
    //             });
    //         })
    //         .catch((error: any) => {
    //             //console.log(1);
    //             setUploadVideoErr(true);
    //             e.onError();
    //         });
    // };
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
    /**
     * Values of CTA are selected based on condition
     * @function ctaSelection
     */
    const ctaSelection = () => {
        if (
            !editVideo.ctaBtnTitle &&
            !editVideo.ctaBtnUrl &&
            ctaBtnUrl &&
            ctaBtnTitle &&
            editFlag === false &&
            resetCTABtn === true &&
            editFormFieldChange === false &&
            uploadReqIdResPoster === -1
        ) {
            // No editVideo.ctaBtnTitle & editVideo.ctaBtnUrl were present
            // Video Overlays button visible and CTA button removed(resetCTABtn), CTA URL and CTA Title are set(editFlag),
            // no form fields are changed (editFormFieldChange) and no new video thumbnail is set(uploadReqIdResPoster)
            // then new CTA URL and CTA Title are passed
            newCTABtnUrl = ctaBtnUrl;
            newCTABtnTitle = ctaBtnTitle;
            console.log("condition 1");
        } else if (
            editVideo.ctaBtnTitle &&
            editVideo.ctaBtnUrl &&
            !ctaBtnUrl &&
            !ctaBtnTitle &&
            editFlag === false &&
            resetCTABtn === true &&
            ((editFormFieldChange === true && uploadReqIdResPoster === -1) ||
                (editFormFieldChange === false && uploadReqIdResPoster > -1) ||
                (editFormFieldChange === true && uploadReqIdResPoster > -1) ||
                (editFormFieldChange === false && uploadReqIdResPoster === -1))
        ) {
            // editVideo.ctaBtnTitle & editVideo.ctaBtnUrl were present
            // If CTA button is removed(resetCTABtn), CTA URL and CTA Title are not set(editFlag),
            // either form fields are changed(editFormFieldChange) or new video thumbnail is set(uploadReqIdResPoster) or both are changed or both are not
            // then new CTA URL and CTA Title are passed
            newCTABtnUrl = "";
            newCTABtnTitle = "";
            console.log("condition 2");
        } else if (
            editVideo.ctaBtnTitle &&
            editVideo.ctaBtnUrl &&
            !ctaBtnUrl &&
            !ctaBtnTitle &&
            editFlag === false &&
            resetCTABtn === false &&
            ((editFormFieldChange === true && uploadReqIdResPoster === -1) ||
                (editFormFieldChange === false && uploadReqIdResPoster > -1) ||
                (editFormFieldChange === true && uploadReqIdResPoster > -1))
        ) {
            // editVideo.ctaBtnTitle & editVideo.ctaBtnUrl were present
            // If CTA button is not removed(resetCTABtn), CTA URL and CTA Title are not set(editFlag),
            // either form fields are changed(editFormFieldChange) or new video thumbnail is set(uploadReqIdResPoster) or both are changed
            // then new CTA URL and CTA Title are passed
            newCTABtnUrl = editVideo.ctaBtnUrl;
            newCTABtnTitle = editVideo.ctaBtnTitle;
            console.log("condition 3");
        } else {
            ctaBtnUrl !== "" && resetCTABtn === false
                ? (newCTABtnUrl = ctaBtnUrl)
                : (newCTABtnUrl = editVideo.ctaBtnUrl);
            ctaBtnTitle !== "" && resetCTABtn === false
                ? (newCTABtnTitle = ctaBtnTitle)
                : (newCTABtnTitle = editVideo.ctaBtnTitle);
            console.log("condition 4");
        }
    };

    /**
     * Values of HashTags are selected based on condition
     * @function tagSelection
     */
    const tagSelection = () => {
        if (tempTag.length > 0) {
            tags = Object.assign(tempTag.map((key: any) => ({ value: key })));
        } else {
            tags = Object.assign(editVideo.tags.map((tag: any) => ({ value: tag.value })));
        }
    };

    /**
     * Values of Description is selected based on condition
     * @function descriptionSelection
     */
    const descriptionSelection = () => {
        if (editVideo.description) {
            // If description was already present
            if (
                form1.getFieldsValue()["description"] &&
                form1.getFieldsValue()["description"].length === 0 &&
                description.length === 0
            ) {
                // If existing value has been cleared
                newDescription = "";
            } else if (
                form1.getFieldsValue()["description"] &&
                form1.getFieldsValue()["description"].length > 0 &&
                description.length > 0
            ) {
                // IF existing value has been changed
                newDescription = description;
            } else if (
                form1.getFieldsValue()["description"] &&
                form1.getFieldsValue()["description"].length > 0 &&
                description.length === 0
            ) {
                // IF existing value has not changed
                newDescription = editVideo.description;
            } else {
                newDescription = editVideo.description;
            }
        } else {
            // If description was not present
            if (
                form1.getFieldsValue()["description"] &&
                form1.getFieldsValue()["description"].length === 0 &&
                description.length === 0
            ) {
                newDescription = "";
            } else if (
                form1.getFieldsValue()["description"] &&
                form1.getFieldsValue()["description"].length > 0 &&
                description.length > 0
            ) {
                // IF existing value has been changed
                newDescription = description;
            } else {
                newDescription = description;
            }
        }
    };

    /**
     * Video data updating function
     * @function updateVideoDispatcher
     * @param {number} videoId
     * @param {string} newCaption
     * @param {number} newPosterId
     * @throws Will throw an error when video details modification fails
     */
    const updateVideoDispatcher = (videoId: number, newCaption: string, newPosterId: number) => {
        dispatch(
            updateVideoAction({
                videoId,
                caption: newCaption,
                description: newDescription,
                ctaBtnUrl: newCTABtnUrl,
                ctaBtnTitle: newCTABtnTitle,
                posterId: newPosterId,
                tags,
                playlistIds,
            })
        )
            .unwrap()
            .then((response: any) => {
                msg.success("Video details updated successfully", 2);
                // showVideoDetailsModal(videoId);
                navigate("/" + RouterPaths.videoLibrary);
                setLoading(false);
                resetForm();
                form1.resetFields();
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };

    /**
     * Function called to save updates to the database
     * @function handleEditVideoDetails
     * @throws Will throw an error when File details editing fails
     */
    const handleEditVideoDetails = () => {
        let uploadReqIdRes: number, newPosterId: number, posterId: number, videoId: number, newCaption: string;
        //newDescription: string;
        //newCTABtnUrl: string,
        //newCTABtnTitle: string;
        posterId = editVideo.posterId;
        videoId = editVideo.id;

        if (uploadReqIdResPoster !== -1) {
            // New Thumbnail is added
            uploadReqIdRes = uploadReqIdResPoster;

            dispatch(verifyUploadReqAction({ uploadReqIdRes }))
                .unwrap()
                .then((response: any) => {
                    const { id }: any = response;
                    posterId = id;
                    caption ? (newCaption = caption) : (newCaption = editVideo.caption);

                    descriptionSelection();
                    newPosterId = posterId;

                    ctaSelection();

                    tagSelection();

                    let playlistIds = tempPlaylist;

                    updateVideoDispatcher(videoId, newCaption, newPosterId);
                });
        } else {
            // No New Thumbnail is added
            caption ? (newCaption = caption) : (newCaption = editVideo.caption);

            descriptionSelection();

            newPosterId = posterId;

            ctaSelection();

            tagSelection();

            let playlistIds = tempPlaylist;

            updateVideoDispatcher(videoId, newCaption, newPosterId);
        }

        setTempTag([]);
        setPosterURL("");
        setCaption("");
        setDescription("");
        setIsEditVideoDetailsVisible(false);
    };

    /**
 * Function called when playlist is selected under playlist section
  /**
 * @function onPlaylistSelect
 * @param {any} value 
 * @param {number} id 
 */
    function onPlaylistSelect(value: any, id: number) {
        setTempPlaylist(Object.assign(value.map((val: any) => ({ playlistId: val.key, videoId: id }))));
    }

    /**
 *  Function called to close Video Overlays Modal
  /**
 * @function handleVideoOverlaysOptCancel
*/
    /**
 *  Function called to show Modal after Video Overlays Modal
  /**
 * @function handleVideoOverlaysOptAdd
*/

    /**
 *  Function called when changes in Form 2 are made to check for Link Error
  /**
 * @function handleForm2Change
*/

    /*
  function handleChoiceChange(value: any) {
    console.log(`Selected: ${value}`);
  }
*/
    return (
        <div className="site-layout-background" style={{ padding: "2vh 1vw", minHeight: "74vh" }}>
            {pageLoading ? (
                <Row
                    justify={"center"}
                    align={"middle"}
                    gutter={[16, 16]}
                    style={{
                        overflow: "hidden scroll",
                        height: "calc(100vh - 15.5rem)",
                        padding: "0 0 1rem",
                    }}
                >
                    <Spin />
                </Row>
            ) : (
                <>
                    <Divider>
                        <Typography.Title level={4}>
                            {formDisable ? "Video Details" : "Edit Video Details"}
                        </Typography.Title>
                    </Divider>
                    <Row justify="center">
                        <Col span={9}>
                            <VideoDetailCard
                                editVideo={editVideo}
                                ctaBtn={ctaBtn}
                                ctaBtnTitle={ctaBtnTitle}
                                ctaBtnUrl={ctaBtnUrl}
                                formDisable={formDisable}
                                setIsEditVideoDetailsVisible={setIsEditVideoDetailsVisible}
                                handleVideoOverlays={handleVideoOverlays}
                                setEditFlag={setEditFlag}
                                setFieldChanged={setFieldChanged}
                                setOverlaysOpt={setOverlaysOpt}
                                setCtaBtn={setCtaBtn}
                                handleVideoOverlaysOpt={handleVideoOverlaysOpt}
                                setCtaBtnUrl={setCtaBtnUrl}
                                setCtaBtnTitle={setCtaBtnTitle}
                                setCaptionErr={setCaptionErr}
                                setDescriptionErr={setDescriptionErr}
                                setResetCTABtn={setResetCTABtn}
                                handleForm1Change={handleForm1Change}
                                setReload={setReload}
                                setFormDisable={setFormDisable}
                            />
                        </Col>
                        <Col span={10}>
                            <div style={{ minHeight: "53.7vh" }}>
                                <EditVideoDetailsForm
                                    form1={form1}
                                    handleForm1Change={handleForm1Change}
                                    formDisable={formDisable}
                                    caption={caption}
                                    setCaption={setCaption}
                                    description={description}
                                    setDescription={setDescription}
                                    setEditFormFieldChange={setEditFormFieldChange}
                                    handleHashTagChange={handleHashTagChange}
                                    hashtags={hashtags}
                                    posterProps={posterProps}
                                    customRequest={customRequest}
                                    setUploadReqIdResPoster={setUploadReqIdResPoster}
                                    setThumbnailId={setThumbnailId}
                                    setThumbnailURL={setThumbnailURL}
                                    uploadReqIdResPoster={uploadReqIdResPoster}
                                    thumbnailId={thumbnailId}
                                    thumbnailURL={thumbnailURL}
                                    playlists={playlists}
                                    onPlaylistSelect={onPlaylistSelect}
                                    getPlaylist={getPlaylist}
                                    setFieldChanged={setFieldChanged}
                                    setReload={setReload}
                                    editVideo={editVideo}
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
                                            borderRadius: ".5rem",
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
                                            handleEditVideoDetails();
                                        }}
                                        loading={loading}
                                        disabled={reset}
                                        style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#F2994A",
                                            borderRadius: ".5re",
                                        }}
                                    >
                                        Save & Update
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
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
                    edit={true}
                    editVideo={editVideo}
                    //setNewCTABtn={setNewCTABtn}
                    setIsCreateVideoVisible={setIsCreateVideoVisible}
                    setIsEditVideoDetailsVisible={setIsEditVideoDetailsVisible}
                    setCtaBtn={setCtaBtn}
                    setReload={setReload}
                    isVideoOverlaysOptVisible={isVideoOverlaysOptVisible}
                    overlaysOpt={overlaysOpt}
                    editFlag={editFlag}
                    titleErr={titleErr}
                    handleFormChange={handleForm1Change}
                    setEditFlag={setEditFlag}
                    setShowDialog={setShowDialog}
                    setTitleErr={setTitleErr}
                    setCtaBtnUrl={setCtaBtnUrl}
                    setCtaBtnTitle={setCtaBtnTitle}
                    setIsVideoOverlaysOptVisible={setIsVideoOverlaysOptVisible}
                    setOverlaysOpt={setOverlaysOpt}
                    setIsVideoOverlaysVisible={setIsVideoOverlaysVisible}
                    setResetCTABtn={setResetCTABtn}
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
