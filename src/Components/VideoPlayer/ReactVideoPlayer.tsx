import { useState } from "react";
import ReactPlayer from "react-player";

interface IProps {
    url?: string;
}
function ReactVideoPlayer({ url }: IProps) {
    const [videoPlaying, setVideoPlaying] = useState(false);

    return (
        <ReactPlayer
            className="youtubeVideoPlayer"
            muted={true}
            volume={1}
            url={url}
            controls={true}
            height="100%"
            width="100%"
            playing={videoPlaying}
            onPlay={setVideoPlaying.bind(null, true)}
            onPause={setVideoPlaying.bind(null, false)}
        />
    );
}

export default ReactVideoPlayer;
