import { useRef, useState, useEffect } from "react";
import {
    IoVolumeMuteOutline,
    IoVolumeHighOutline,
    IoReloadOutline,
    IoShareSocialOutline,
    IoScanOutline,
} from "react-icons/io5";
import { RWebShare } from "react-web-share";
import "./VideoPlayer.css";

type VideoPlayerTypes = {
    url: string | "";
    title: string;
    cta: any;
    id: number | null;
    shareEnabled: any;
    ctaURL: any;
    videoOrientation?: string | "";
};

export default function VideoPlayer({
    url,
    title,
    cta,
    id,
    shareEnabled,
    ctaURL,
    videoOrientation = "",
}: VideoPlayerTypes) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(10);
    const [showProgress, setShowProgress] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const vidRef = useRef<any>(null);

    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const startVideo = () => {
        setProgress(4);
        if (isVideoEnded) {
            setIsVideoEnded(false);
        }
        // @ts-ingore
        if (vidRef) vidRef.current.play();
        setShowProgress(true);
        setIsVideoPlaying(true);
        setShowTitle(false);
        // setProgress(0);
    };
    const stopVideo = () => {
        vidRef.current?.pause();
        // setProgress(0);
        setIsVideoPlaying(false);
        setShowTitle(true);
    };
    const onVideoClick = () => {
        if (isVideoPlaying) {
            vidRef.current?.pause();
            setIsVideoPlaying(false);
            setShowTitle(true);
        } else {
            vidRef.current?.play();
            setShowProgress(true);
            setIsVideoPlaying(true);
            setShowTitle(false);
        }
    };
    const onPauseVideo = () => {
        if (isVideoPlaying) {
            vidRef.current?.pause();
            setIsVideoPlaying(false);
            setShowTitle(true);
        }
    };
    const onMuteVideo = () => {
        if (isMuted) {
            if (vidRef?.current?.defaultMuted) vidRef.current.defaultMuted = false;
            vidRef.current.muted = false;
            setIsMuted(false);
        } else {
            vidRef.current.defaultMuted = true;
            vidRef.current.muted = true;
            setIsMuted(true);
        }
    };

    const videoEnded = () => {
        setIsVideoEnded(false);
        vidRef.current?.play();
        setProgress(10);
        setShowProgress(true);
        setIsVideoPlaying(true);
        setShowTitle(false);
    };
    const showCurrentTime = ({ current: videoDom }: any) => {
        const border = document.querySelector(".progress-bar-" + id);
        if ((videoDom.currentTime / videoDom.duration) * 100 > 10) {
            setProgress((videoDom.currentTime / videoDom.duration) * 100);
        }
        // if (videoDom.currentTime / videoDom.duration >= 0.98) {
        //   console.log("hi", border);
        //   border.style.borderBottomRightRadius = "50px";
        // }
    };

    useEffect(() => {
        vidRef.current?.addEventListener("timeupdate", () => {
            showCurrentTime(vidRef);
        });
    }, []);
    return (
        <>
            <div className={showTitle ? "video-cards video-cards-hide" : "video-cards video-cards-show"}>
                <video
                    onClick={onVideoClick}
                    onMouseOver={window.innerWidth >= 650 ? startVideo : () => {}}
                    //onMouseOut={stopVideo}
                    onEnded={() => setIsVideoEnded(true)}
                    className={`${videoOrientation === "landscape" ? "landscapeRatio" : "portraitRatio"} video-player`}
                    // className='video-player'
                    ref={vidRef}
                    src={url}
                    muted={isMuted}
                    playsInline
                />
                <div className="video-header-center">
                    {/*shareEnabled === true ? (
            <RWebShare
              data={{
                text: 'Like humans, flamingos make friends for life',
                url: url,
                title: 'Share Video Url',
              }}
              onClick={() => console.log('shared successfully!')}
            >
              <IoShareSocialOutline
                className="video-icon"
                fontSize={'1.5rem'}
                color={'white'}
              />
            </RWebShare>
          ) : (
            ''
          )*/}
                    {isMuted ? (
                        <IoVolumeMuteOutline
                            className="video-icon"
                            fontSize={"1.5rem"}
                            onClick={onMuteVideo}
                            color={"white"}
                            style={{ marginRight: "1rem" }}
                        />
                    ) : (
                        <IoVolumeHighOutline
                            className="video-icon"
                            fontSize={"1.5rem"}
                            onClick={onMuteVideo}
                            color={"white"}
                            style={{ marginRight: "1rem" }}
                        />
                    )}
                </div>
                <div className="video-center">
                    {shareEnabled === true ? (
                        <RWebShare
                            data={{
                                text: "Like humans, flamingos make friends for life",
                                url: url,
                                title: "Share Video Url",
                            }}
                            onClick={() => console.log("shared successfully!")}
                            // style={{ marginLeft: "11vw" }}
                        >
                            <IoShareSocialOutline className="video-icon" fontSize={"1.5rem"} color={"white"} />
                        </RWebShare>
                    ) : (
                        ""
                    )}
                </div>

                <div className="video-center reload-icon">
                    {isVideoEnded ? (
                        <IoReloadOutline
                            className="video-icon"
                            fontSize={"1.5rem"}
                            onClick={videoEnded}
                            color={"white"}
                        />
                    ) : null}
                </div>
                <div className="video-footer button-div">
                    {cta ? (
                        <button className="video-footer-button" onClick={() => window.open(ctaURL, "_blank")}>
                            {cta}
                        </button>
                    ) : null}
                </div>
                <div className="video-footer">
                    <IoScanOutline
                        className="video-icon"
                        fontSize={"1.5rem"}
                        //onClick={onMuteVideo}
                        color={"white"}
                        // style={{ marginLeft: '11vw' }}
                    />
                </div>
                {showProgress && (
                    <div className="progress">
                        <div
                            className={`progress-bar progress-bar-${id}`}
                            style={{ width: `${progress}%` }}
                            role="progressbar"
                        ></div>
                    </div>
                )}
            </div>
            {showTitle && (
                <div className="video-header">
                    <h3 className="video-title">{title}</h3>
                </div>
            )}

            {/*<div className="video-center">
        {isVideoEnded ? (
          <IoReloadOutline
            className="video-icon"
            fontSize={'1.5rem'}
            onClick={videoEnded}
            color={'white'}
          />
        ) : isVideoPlaying ? (
          <IoPauseOutline
            className="video-icon"
            fontSize={'1.5rem'}
            onClick={onVideoClick}
            color={'white'}
          />
        ) : (
          <IoPlayOutline
            className="video-icon"
            fontSize={'1.5rem'}
            onClick={onVideoClick}
            color={'white'}
          />
        )}
      </div>*/}
            {/*<div className="video-footer">
        {shareEnabled == true ? (
          <RWebShare
            data={{
              text: 'Like humans, flamingos make friends for life',
              url: url,
              title: 'Share Video Url',
            }}
            onClick={() => console.log('shared successfully!')}
          >
            <IoShareSocialOutline
              className="video-icon"
              fontSize={'1.5rem'}
              color={'white'}
            />
          </RWebShare>
        ) : (
          ''
        )}
        {isMuted ? (
          <IoVolumeMuteOutline
            className="video-icon"
            fontSize={'1.5rem'}
            onClick={onMuteVideo}
            color={'white'}
          />
        ) : (
          <IoVolumeHighOutline
            className="video-icon"
            fontSize={'1.5rem'}
            onClick={onMuteVideo}
            color={'white'}
          />
        )}

        {cta ? (
          <button
            className="video-footer-button"
            onClick={() => window.open(ctaURL, '_blank')}
          >
            {cta}
          </button>
        ) : null}
      </div>*/}
            {/* {isVideoEnded && (
        <div className="video-ended">
          <IoReloadOutline onClick={videoEnded} />
        </div>
      )} */}
        </>
    );
}
