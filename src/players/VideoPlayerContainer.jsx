import ReactPlayer from "react-player";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";

function VideoPlayerContainer() {
  const { isPlayingVideo, chapterColor, nowPlaying } = useCtxtData();
  const { playUrl, chapterName, sectionName, songName, chapterId } = nowPlaying;

  if (!isPlayingVideo) return <></>;
  return (
    <>
      <div
        className='video'
        style={{ borderColor: chapterColor(chapterId)?.light }}>
        <div style={{ textAlign: "center", padding: "4px" }}>
          {`${chapterName}  ${sectionName}: ${songName}`}
        </div>

        <ReactPlayer
          className='react-player'
          url={playUrl}
          // height='fit-content'
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
