import React, { useEffect } from "react";
import { Card, Row } from "antd";
import { AppstoreAddOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Button from "./Partials/Button";
import { RouterPaths } from "../api/RouterPaths";

const VideoDetailCard = ({
    editVideo,
    ctaBtn,
    ctaBtnTitle,
    ctaBtnUrl,
    formDisable,
    setIsEditVideoDetailsVisible,
    handleVideoOverlays,
    setEditFlag,
    setFieldChanged,
    setOverlaysOpt,
    setCtaBtn,
    handleVideoOverlaysOpt,
    setCtaBtnUrl,
    setCtaBtnTitle,
    setCaptionErr,
    setDescriptionErr,
    handleForm1Change,
    setResetCTABtn,
    setReload,
    setFormDisable,
}: {
    editVideo: any;
    ctaBtn: boolean | undefined;
    showDescription?: boolean;
    ctaBtnTitle: string;
    ctaBtnUrl: string;
    formDisable: boolean | undefined;
    setIsEditVideoDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleVideoOverlays: () => void;
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
    setFieldChanged: React.Dispatch<React.SetStateAction<string>>;
    setOverlaysOpt: React.Dispatch<React.SetStateAction<number>>;
    setCtaBtn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    handleVideoOverlaysOpt: () => void;
    setCtaBtnUrl: React.Dispatch<React.SetStateAction<string>>;
    setCtaBtnTitle: React.Dispatch<React.SetStateAction<string>>;
    setCaptionErr: React.Dispatch<React.SetStateAction<boolean>>;
    setDescriptionErr: React.Dispatch<React.SetStateAction<boolean>>;
    setResetCTABtn: React.Dispatch<React.SetStateAction<boolean>>;
    handleForm1Change: () => void;
    setReload: React.Dispatch<React.SetStateAction<{}>>;
    setFormDisable: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect editVideo.ctaBtnTitle useEffect ", editVideo.ctaBtnTitle);
    }, []);
    return (
        <Card
            className={"global_box_shadow"}
            bodyStyle={{ padding: "2rem", textAlign: "center" }}
            style={{
                width: "26vw",
                height: "67vh",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "40px 0px",
            }}
        >
            <Row justify="center" align="middle">
                <div className="video-edit-container outer-max-width" id="video-container">
                    <VideoPlayer
                        url={editVideo.resource ? editVideo.resource.urls.original : ""}
                        title={""}
                        cta={ctaBtn === true ? "" : ctaBtnTitle ? ctaBtnTitle : editVideo.ctaBtnTitle}
                        ctaURL={ctaBtn === true ? "" : ctaBtnUrl ? ctaBtnUrl : editVideo.ctaBtnUrl}
                        id={editVideo.id}
                        shareEnabled={true}
                        videoOrientation={editVideo.orientation}
                    />
                </div>
            </Row>
            <>{console.log("editVideo.ctaBtnTitle ", editVideo.ctaBtnTitle)}</>
            {ctaBtn === true ? (
                // {editVideo.ctaBtnTitle === "" ? (
                <Row justify="center" align="top">
                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        size="middle"
                        block={false}
                        disabled={formDisable}
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "#F2994A",
                            marginTop: "10px",
                        }}
                        icon={<AppstoreAddOutlined />}
                        onClick={() => {
                            setIsEditVideoDetailsVisible(false);
                            handleVideoOverlays();
                            setEditFlag(true);
                            setFieldChanged("Video Overlays");
                        }}
                    >
                        Video Overlays
                    </Button>
                </Row>
            ) : (
                <Row justify="center" align="top">
                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        disabled={formDisable}
                        size="middle"
                        block={false}
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "#F2994A",
                            marginTop: "10px",
                            marginRight: "5px",
                        }}
                        onClick={() => {
                            setIsEditVideoDetailsVisible(false);
                            setOverlaysOpt(1);
                            setCtaBtn(false);
                            setEditFlag(true);
                            handleVideoOverlaysOpt();
                            setFieldChanged("Change CTA");
                            //setReload({});
                        }}
                    >
                        Change CTA
                    </Button>

                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        disabled={formDisable}
                        size="middle"
                        block={false}
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "#F2994A",
                            marginTop: "10px",
                            marginLeft: "5px",
                        }}
                        onClick={() => {
                            setCtaBtn(true);
                            setCtaBtnUrl("");
                            setCtaBtnTitle("");
                            setCaptionErr(false);
                            setDescriptionErr(false);
                            handleForm1Change();
                            setResetCTABtn(true);
                            setFieldChanged("Remove CTA");
                            setReload({}); // used to counter useState async issue by re rendering
                        }}
                    >
                        Remove CTA
                    </Button>
                </Row>
            )}
            {formDisable ? (
                <Row justify="center" align="top">
                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        size="middle"
                        block={false}
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "#F2994A",
                            marginTop: "10px",
                            marginRight: "5px",
                        }}
                        icon={<EditOutlined />}
                        onClick={() => {
                            setFormDisable(false);
                            navigate(`${RouterPaths.editDetails}`);
                        }}
                    >
                        Edit Details
                    </Button>
                </Row>
            ) : (
                ""
            )}
        </Card>
    );
};

export default VideoDetailCard;
