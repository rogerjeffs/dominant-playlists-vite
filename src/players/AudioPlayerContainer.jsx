// eslint-disable-next-line no-unused-vars
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useCtxtData } from "../contexts/appContext";
import CloseButton from "../ui-components/CloseButton";
export default function AudioPlayerContainer() {
  const {
    isPlayingAudio,
    playUrl,
    songName,
    chapterColor,
    currentChapterId,
    currentSectionId,
    lists,
  } = useCtxtData();
  const chapterName = currentChapterId ? lists[currentChapterId].name : "";
  const sectionName = currentSectionId
    ? lists[currentChapterId].sections[currentSectionId].name
    : "";
  // console.log(chapterName);
  if (!isPlayingAudio) return <></>;
  return (
    <div
      className='audio'
      style={{ borderColor: chapterColor(currentChapterId).light }}>
      <AudioPlayer
        src={playUrl}
        autoPlayAfterSrcChange={false}
        header={`${chapterName}  ${sectionName}: ${songName}`}
        /*   footer='Footer text' */
        customAdditionalControls={[<CloseButton />]}
      />
    </div>
  );
}
