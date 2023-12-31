import ReactPlayer from "react-player";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";

function VideoPlayerContainer() {
  const { playUrl, isPlayingVideo, currentChapter, currentSection, songName } =
    useCtxtData();
  // console.log(playUrl);
  // if (true) return <></>;
  if (!isPlayingVideo) return <></>;
  return (
    <>
      <div className='video' style={{ borderColor: currentChapter.color }}>
        <div style={{ textAlign: "center" }}>
          {`${currentChapter.name}  ${currentSection.name}: ${songName}`}
        </div>

        <ReactPlayer
          className='react-player'
          url={playUrl}
          // height='315px'
          width='100%'
          controls
        />
        <div className='video-footer'>
          <CloseButton />
        </div>
      </div>
    </>
  );
}

export default VideoPlayerContainer;
