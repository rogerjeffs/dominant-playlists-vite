import ReactPlayer from "react-player";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";

function VideoPlayerContainer() {
  const {
    lists,
    playUrl,
    isPlayingVideo,
    songName,
    currentChapterId,
    currentSectionId,
    chapterColor,
  } = useCtxtData();
  const chapterName = currentChapterId ? lists[currentChapterId].name : "";
  const sectionName = currentSectionId
    ? lists[currentChapterId].sections[currentSectionId]
    : "";
  if (!isPlayingVideo) return <></>;
  return (
    <>
      <div
        className='video'
        style={{ borderColor: chapterColor(currentChapterId).light }}>
        <div style={{ textAlign: "center" }}>
          {`${chapterName}  ${sectionName}: ${songName}`}
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
