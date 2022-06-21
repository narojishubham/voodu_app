import React, { ReactNode, useState } from "react";
import { Card, Typography } from "antd";
import "./FeedCard.css";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface CardDataProps {
    coverImage: string;
    title: string;
    noOfVideos?: number;
    videoURL?: string | "";
    ctaBtnTitle?: string;
    ctaBtnUrl?: string;
    id?: number | null;
    shareEnabled?: boolean;
    mode?: number; // Mode 1: Video, Mode 2: Thumbnail, Mode 3: Hybrid
}

const FeedCard = ({
    data,
    showDescription = false,
    actionButtonsLeft = [],
    actionButtonsRight = [],
}: {
    data: CardDataProps;
    showDescription?: boolean;
    actionButtonsLeft?: ReactNode[];
    actionButtonsRight?: ReactNode[];
}) => {
    const [toggle, setToggle] = useState(false);

    return (
        <Card
            onMouseEnter={data.mode === 3 ? () => setToggle(true) : () => {}}
            onMouseLeave={data.mode === 3 ? () => setToggle(false) : () => {}}
            hoverable
            className={"FeedCardContainer"}
            cover={
                data.mode === 1 ? (
                    <VideoPlayer
                        url={data.videoURL || ""}
                        title={data.title}
                        cta={data.ctaBtnTitle ? data.ctaBtnTitle : ""}
                        ctaURL={data.ctaBtnUrl ? data.ctaBtnUrl : ""}
                        id={data.id || -1}
                        shareEnabled={data.shareEnabled}
                    />
                ) : data.mode === 2 ? (
                    <img
                        alt="example"
                        src={data.coverImage}
                        style={{
                            borderRadius: "0.8rem 0.8rem 0 0",

                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : data.mode === 3 && toggle ? (
                    // <ReactVideoPlayer
                    //     url={data?.videoURL}
                    //     title={data?.title}
                    //     cta={data.ctaBtnTitle ? data.ctaBtnTitle : ""}
                    //     ctaURL={data.ctaBtnUrl ? data.ctaBtnUrl : ""}
                    //     id={data.id}
                    //     shareEnabled={data.shareEnabled}
                    // />
                    <VideoPlayer
                        url={data.videoURL || ""}
                        title={data.title}
                        cta={data.ctaBtnTitle ? data.ctaBtnTitle : ""}
                        ctaURL={data.ctaBtnUrl ? data.ctaBtnUrl : ""}
                        id={data.id || -1}
                        shareEnabled={data.shareEnabled}
                    />
                ) : (
                    <img
                        alt="example"
                        src={data.coverImage}
                        style={{
                            borderRadius: "0.8rem 0.8rem 0 0",
                            objectFit: "cover",
                            height: "100%",
                        }}
                    />
                )
            }
            bodyStyle={{
                padding: "0.5rem",
                textAlign: "center",
            }}
        >
            <Card.Meta
                description={
                    <>
                        <Typography.Title ellipsis level={5} style={{ margin: 0 }}>
                            {data.title}
                        </Typography.Title>
                        {showDescription ? (
                            <Typography.Paragraph style={{ margin: 0 }}>Videos: {data.noOfVideos}</Typography.Paragraph>
                        ) : null}
                    </>
                }
            />
            {
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            width: "50%",
                            position: "absolute",
                            top: -1,
                            left: -1,
                        }}
                    >
                        {actionButtonsLeft}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                            width: "50%",
                            position: "absolute",
                            top: -1,
                            right: -1,
                        }}
                    >
                        {actionButtonsRight}
                    </div>
                </>
            }
        </Card>
    );
};

export default FeedCard;
